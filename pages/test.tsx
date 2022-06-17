import { useLazyLoadQuery, graphql } from 'react-relay'
import { writeSchemaToFile } from '../lib/graphqlSchema'
import { test_Query } from '../__generated__/test_Query.graphql'

export default function Test() {
  const data = useLazyLoadQuery<test_Query>(graphql`
    query test_Query {
      shoppingList {
        id
        title
      }
    }
  `, {})

  return <ul>
    {data?.shoppingList?.map(item => <li key={item.id}>{item.title}</li>)}
  </ul>
}

export async function getStaticProps() {
  await writeSchemaToFile()
  return {
    props: {}
  }
}