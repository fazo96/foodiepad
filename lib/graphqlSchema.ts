import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import RelayPlugin from '@pothos/plugin-relay'
import { PrismaClient } from '@prisma/client'
import { printSchema, lexicographicSortSchema } from 'graphql'
import path from 'path'

// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import type PrismaTypes from '@pothos/plugin-prisma/generated'

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

  builder.prismaObject('ShoppingListItem', {
    fields: (t) => ({
      id: t.exposeID('id'),
      title: t.exposeString('title'),
    }),
  });

  builder.queryType({
    fields: (t) => ({
      shoppingList: t.prismaField({
        type: ['ShoppingListItem'],
        resolve: () => prisma.shoppingListItem.findMany()
      })
    })
  })
  
  return builder.toSchema({})
}

export async function writeSchemaToFile() {
  if (typeof window !== typeof undefined) return

  const schema = buildSchema()
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  const fs = await import('fs')

  await new Promise<void>((resolve, reject) => {
    fs.writeFile(path.join(__dirname, '../schema.graphql'), schemaAsString, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })

  console.log('Updated schema.graphql')

  return schemaAsString
}