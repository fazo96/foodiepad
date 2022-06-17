// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServer } from '@graphql-yoga/node'
import SchemaBuilder from '@pothos/core'
import { PrismaClient } from '@prisma/client'
import PrismaPlugin from '@pothos/plugin-prisma'
import { NextApiRequest, NextApiResponse } from 'next'
import RelayPlugin from '@pothos/plugin-relay'

// This is the default location for the generator, but this can be
// customized as described above.
// Using a type only import will help avoid issues with undeclared
// exports in esm mode
import type PrismaTypes from '@pothos/plugin-prisma/generated';

const prisma = new PrismaClient({});

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

const server = createServer<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema: builder.toSchema({})
})

export default server
