import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import RelayPlugin from '@pothos/plugin-relay'
import { PrismaClient } from '@prisma/client'

// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
// @ts-ignore-next-line
import type PrismaTypes from '@pothos/plugin-prisma/generated'

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
    id: { field: 'id' },
    fields: (t) => ({
      title: t.exposeString('title')
    })
  })

  // Query Type
  builder.queryType({
    fields: (t) => ({
      shoppingList: t.prismaConnection({
        type: ShoppingListItem,
        cursor: 'id',
        resolve: () => prisma.shoppingListItem.findMany()
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

  return builder.toSchema({})
}
