import { writeSchemaToFile } from "../../../lib/graphqlSchema";

export default async function(req, res) {
  const schema = await writeSchemaToFile()

  res.end(schema)
}