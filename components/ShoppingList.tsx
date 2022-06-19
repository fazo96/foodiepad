import { graphql, useLazyLoadQuery } from 'react-relay'
import { ShoppingList_Query } from '../__generated__/ShoppingList_Query.graphql'
import {
  List, ListItem
} from '@mui/material'
import ShoppingListItem from './ShoppingListItem'
import ShoppingListAddItem from './ShoppingListAddItem'
import { useEffect, useState } from 'react'

export default function ShoppingList () {
  const [fetchKey, setFetchKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setFetchKey(fetchKey + 1), 2000)
    return () => {
      clearInterval(interval)
    }
  }, [fetchKey, setFetchKey])

  const data = useLazyLoadQuery<ShoppingList_Query>(graphql`
    query ShoppingList_Query {
      shoppingList(first: 100) @connection(key: "main_shoppingList") {
        __id
        edges {
          node {
            id
            ...ShoppingListItem_Item
          }
        }
      }
    }
    `, {}, {
    fetchPolicy: 'store-and-network',
    fetchKey
  })
  const connectionId = data?.shoppingList?.__id

  return <>
    <List>
      <ListItem>
        <ShoppingListAddItem connectionId={connectionId} />
      </ListItem>
      {data?.shoppingList?.edges?.map(item => (
        item === null || item.node === null
          ? null
          : (
            <ShoppingListItem
              key={item.node.id}
              shoppingListItemFragmentRef={item.node}
              connectionId={connectionId}
            />
          )
      ))}
    </List>
  </>
}
