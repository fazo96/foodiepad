import { writeSchemaToFile } from '../../../lib/graphql/schema/writer'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function GetSchema (req: NextApiRequest, res: NextApiResponse) {
  const schema = writeSchemaToFile()

  res.end(schema)
}
