import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { graphql, useFragment } from 'react-relay'
import { memo, useCallback } from 'react'
import { Assignment } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { ShoppingList_List$key } from '../__generated__/ShoppingList_List.graphql'

interface IShoppingListProps {
  shoppingListFragmentRef: ShoppingList_List$key
}

function ShoppingList ({ shoppingListFragmentRef }: IShoppingListProps) {
  const router = useRouter()
  const list = useFragment(graphql`
    fragment ShoppingList_List on ShoppingList {
      id
      title
    }
  `, shoppingListFragmentRef)

  const openList = useCallback(() => {
    if (list?.id) router.push(`/list/${list.id}`)
  }, [list?.id, router])

  if (!list) return null

  return <ListItem button onClick={openList}>
    <ListItemIcon>
      <Assignment />
    </ListItemIcon>
    <ListItemText>
      {list.title}
    </ListItemText>
  </ListItem>
}

export default memo(ShoppingList)
