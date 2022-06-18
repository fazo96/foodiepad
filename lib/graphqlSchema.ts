import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import RelayPlugin from '@pothos/plugin-relay'
import { PrismaClient } from '@prisma/client'

// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import {lexicographicSortSchema, printSchema} from "graphql";
import {writeFileSync} from "fs";

export function buildSchema() {
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
      cursorType: 'String',
    },
  });

  // Types
  const ShoppingListItem = builder.prismaNode('ShoppingListItem', {
    id: { field: 'id' },
    fields: (t) => ({
      title: t.exposeString('title'),
    }),
  });

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
  const ShoppingListItemInput = builder.inputType('ShoppingListItemInput', {
    fields: (t) => ({
      title: t.string({ required: true })
    })
  })

  builder.mutationType({
    fields: (t) => ({
      createShoppingListItem: t.prismaField({
        type: ShoppingListItem,
        args: {
          input: t.arg({ type: ShoppingListItemInput, required: true })
        },
        async resolve(root, args, variables) {
          const item = await prisma.shoppingListItem.create({
            data: {
              title: variables.input.title
            }
          })
          return item
        }
      })
    })
  })

  return builder.toSchema({})
}
