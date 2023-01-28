import { graphql, useLazyLoadQuery } from 'react-relay'
import {
  List, ListItem
} from '@mui/material'
import ShoppingListItem from './ShoppingListItem'
import ShoppingListAddItem from './ShoppingListAddItem'
import { memo, useEffect, useState } from 'react'
import { ShoppingListContent_Query } from '../__generated__/ShoppingListContent_Query.graphql'

function ShoppingListContent ({ id }: { id: string }) {
  const [fetchKey, setFetchKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => setFetchKey(fetchKey + 1), 2000)
    return () => {
      clearInterval(interval)
    }
  }, [fetchKey, setFetchKey])

  const data = useLazyLoadQuery<ShoppingListContent_Query>(graphql`
    query ShoppingListContent_Query($id: ID!) {
      shoppingList: node(id: $id) {
        ... on ShoppingList {
          items(first: 100) @connection(key: "ShoppingList_items") {
            __id
            edges {
              node {
                id
                ...ShoppingListItem_Item
              }
            }
          }
        }
      }
    }
    `, {
    id
  }, {
    fetchPolicy: 'store-and-network',
    fetchKey
  })
  const connectionId = data?.shoppingList?.__id

  return <>
    <List>
      <ListItem>
        <ShoppingListAddItem connectionId={connectionId} shoppingListId={id} />
      </ListItem>
      {data?.shoppingList?.items?.edges?.map(item => (
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
export default memo(ShoppingListContent)
