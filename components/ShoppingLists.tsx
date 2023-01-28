import { graphql, useLazyLoadQuery } from 'react-relay'
import {
  List, ListItem
} from '@mui/material'
import { memo } from 'react'
import CreateShoppingList from './CreateShoppingList'
import { ShoppingLists_Query } from '../__generated__/ShoppingLists_Query.graphql'
import ShoppingList from './ShoppingList'

function ShoppingLists () {
  const data = useLazyLoadQuery<ShoppingLists_Query>(graphql`
    query ShoppingLists_Query {
      shoppingLists(first: 100) @connection(key: "ShoppingLists_shoppingLists") {
        __id
        edges {
          node {
            id
            ...ShoppingList_List
          }
        }
      }
    }
    `, {
  }, {
    fetchPolicy: 'store-and-network'
  })
  const connectionId = data?.shoppingLists?.__id

  return <>
    <List>
      <ListItem>
        <CreateShoppingList connectionId={connectionId} />
      </ListItem>
      {data?.shoppingLists?.edges?.map(item => (
        item === null || item.node === null
          ? null
          : (
            <ShoppingList
              key={item.node.id}
              shoppingListFragmentRef={item.node}
            />
          )
      ))}
    </List>
  </>
}

export default memo(ShoppingLists)
