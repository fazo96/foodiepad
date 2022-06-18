import {lexicographicSortSchema, printSchema} from "graphql";
import {buildSchema} from "./graphqlSchema";
import {writeFileSync} from "fs";

export function writeSchemaToFile() {
    if (typeof window !== typeof undefined) return

    const schema = buildSchema()
    const schemaAsString = printSchema(lexicographicSortSchema(schema));

    writeFileSync('schema.graphql', schemaAsString)

    console.log('Updated schema.graphql')

    return schemaAsString
}
