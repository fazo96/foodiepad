import { writeSchemaToFile } from "../../../lib/graphqlSchemaWriter";

export default async function GetSchema(req, res) {
  const schema = await writeSchemaToFile()

  res.end(schema)
}
