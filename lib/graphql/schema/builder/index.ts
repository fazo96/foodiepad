import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import RelayPlugin, { decodeGlobalID } from '@pothos/plugin-relay'
import { PrismaClient } from '@prisma/client'
// @ts-ignore-next-line
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import { prismaNodeRelayOptions } from './relay'

export function buildSchema () {
  const prisma = new PrismaClient({})

  const builder = new SchemaBuilder<{
    PrismaTypes: PrismaTypes;
  }>({
    plugins: [PrismaPlugin, RelayPlugin],
    prisma: {
      client: prisma
    },
    relayOptions: {
      // These will become the defaults in the next major version
      clientMutationId: 'omit',
      cursorType: 'String'
    }
  })

  // Types
  const ShoppingListItem = builder.prismaNode('ShoppingListItem', {
    ...prismaNodeRelayOptions('ShoppingListItem'),
    fields: (t) => ({
      title: t.exposeString('title'),
      completed: t.exposeBoolean('completed')
    })
  })

  // Query Type
  builder.queryType({
    fields: (t) => ({
      shoppingList: t.prismaConnection({
        type: ShoppingListItem,
        cursor: 'id',
        args: {
          completed: t.arg({
            type: 'Boolean',
            required: false
          })
        },
        resolve: (query, parent, args) => {
          return prisma.shoppingListItem.findMany({
            orderBy: [
              { completed: 'asc' },
              { completed_at: 'desc'},
              { title: 'asc' }
            ],
            where: {
              completed: typeof args.completed === 'boolean' ? args.completed : undefined
            }
          })
        }
      })
    })
  })

  // Mutations

  builder.mutationType({
    fields: (t) => ({})
  })

  builder.relayMutationField(
    'createShoppingListItem',
    {
      inputFields: (t) => ({
        title: t.string({ required: true })
      })
    }, {
      async resolve (root, args) {
        const shoppingListItem = await prisma.shoppingListItem.create({
          data: {
            title: args.input.title
          }
        })
        return {
          shoppingListItem
        }
      }
    },
    {
      outputFields: (t) => ({
        shoppingListItem: t.expose('shoppingListItem', {
          type: ShoppingListItem
        })
      })
    }
  )

  builder.relayMutationField(
    'updateShoppingListItem',
    {
      inputFields: (t) => ({
        shoppingListItem: t.globalID({ required: true }),
        title: t.string(),
        completed: t.boolean()
      })
    }, {
      async resolve (root, args) {
        const shoppingListItemReference = decodeGlobalID(args.input.shoppingListItem.id)
        if (shoppingListItemReference.typename !== ShoppingListItem.name) {
          throw new Error(`Invalid ${ShoppingListItem.name} ID`)
        }
        const shoppingListItem = await prisma.shoppingListItem.update({
          where: { id: parseInt(shoppingListItemReference.id, 10) },
          data: {
            title: args.input.title || undefined,
            completed: args.input.completed ?? undefined,
            completed_at: args.input.completed ? new Date() : undefined
          }
        })
        return {
          shoppingListItem
        }
      }
    }, {
      outputFields: (t) => ({
        shoppingListItem: t.expose('shoppingListItem', {
          type: ShoppingListItem
        })
      })
    }
  )

  builder.relayMutationField(
    'deleteShoppingListItem',
    {
      inputFields: (t) => ({
        shoppingListItem: t.globalID({ required: true })
      })
    }, {
      async resolve (root, args) {
        const { typename, id } = decodeGlobalID(args.input.shoppingListItem.id)
        if (typename !== ShoppingListItem.name) {
          throw new Error(`Invalid ${ShoppingListItem.name} ID`)
        }
        const shoppingListItem = await prisma.shoppingListItem.delete({
          where: { id: parseInt(id, 10) }
        })
        return {
          shoppingListItem
        }
      }
    }, {
      outputFields: (t) => ({
        shoppingListItem: t.expose('shoppingListItem', {
          type: ShoppingListItem
        })
      })
    }
  )

  return builder.toSchema({})
}
