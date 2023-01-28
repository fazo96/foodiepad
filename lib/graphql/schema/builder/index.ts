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
      completed: t.exposeBoolean('completed'),
      shoppingList: t.relation('shopping_list')
    })
  })

  const ShoppingList = builder.prismaNode('ShoppingList', {
    ...prismaNodeRelayOptions('ShoppingList'),
    fields: (t) => ({
      title: t.exposeString('title'),
      items: t.relatedConnection('items', {
        cursor: 'id',
        args: {
          completed: t.arg.boolean()
        },
        query: (args, context) => {
          return {
            orderBy: [
              { completed: 'asc' },
              { completed_at: 'desc' },
              { title: 'asc' }
            ],
            where: {
              completed: typeof args.completed === 'boolean' ? args.completed : undefined
            }
          }
        }
      })
    })
  })

  // Query Type
  builder.queryType({
    fields: (t) => ({
      shoppingLists: t.prismaConnection({
        type: ShoppingList,
        cursor: 'id',
        resolve: (query, parent, args) => {
          return prisma.shoppingList.findMany({
            orderBy: [
              { title: 'asc' }
            ]
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
    'createShoppingList',
    {
      inputFields: (t) => ({
        title: t.string({ required: true })
      })
    }, {
      async resolve (root, args) {
        const shoppingList = await prisma.shoppingList.create({
          data: {
            title: args.input.title
          }
        })
        return {
          shoppingList
        }
      }
    },
    {
      outputFields: (t) => ({
        shoppingList: t.expose('shoppingList', {
          type: ShoppingList
        })
      })
    }
  )

  builder.relayMutationField(
    'updateShoppingList',
    {
      inputFields: (t) => ({
        shoppingList: t.globalID({ required: true }),
        title: t.string()
      })
    }, {
      async resolve (root, args) {
        const shoppingListReference = decodeGlobalID(args.input.shoppingList.id)
        if (shoppingListReference.typename !== ShoppingList.name) {
          throw new Error(`Invalid ${ShoppingList.name} ID`)
        }
        const shoppingList = await prisma.shoppingList.update({
          where: { id: parseInt(shoppingListReference.id, 10) },
          data: {
            title: args.input.title || undefined
          }
        })
        return {
          shoppingList
        }
      }
    }, {
      outputFields: (t) => ({
        shoppingListItem: t.expose('shoppingList', {
          type: ShoppingList
        })
      })
    }
  )

  builder.relayMutationField(
    'deleteShoppingList',
    {
      inputFields: (t) => ({
        shoppingList: t.globalID({ required: true })
      })
    }, {
      async resolve (root, args) {
        const { typename, id } = decodeGlobalID(args.input.shoppingList.id)
        if (typename !== ShoppingList.name) {
          throw new Error(`Invalid ${ShoppingList.name} ID`)
        }
        const shoppingList = await prisma.shoppingList.delete({
          where: { id: parseInt(id, 10) }
        })
        return {
          shoppingList
        }
      }
    }, {
      outputFields: (t) => ({
        shoppingList: t.expose('shoppingList', {
          type: ShoppingList
        })
      })
    }
  )

  builder.relayMutationField(
    'createShoppingListItem',
    {
      inputFields: (t) => ({
        shoppingList: t.globalID({ required: true }),
        title: t.string({ required: true })
      })
    }, {
      async resolve (root, args) {
        const shoppingListReference = decodeGlobalID(args.input.shoppingList.id)
        const shoppingListItem = await prisma.shoppingListItem.create({
          data: {
            shopping_list_id: parseInt(shoppingListReference.id, 10),
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
