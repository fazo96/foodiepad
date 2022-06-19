// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createServer } from '@graphql-yoga/node'
import { NextApiRequest, NextApiResponse } from 'next'
import { buildSchema } from '../../../lib/graphql/schema/builder'

const server = createServer<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema: buildSchema()
})

export default server
