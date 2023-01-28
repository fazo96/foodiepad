import { IconButton, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText } from '@mui/material'
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBox from '@mui/icons-material/CheckBox'
import ClearAll from '@mui/icons-material/ClearAll'
import { graphql, useFragment, useMutation } from 'react-relay'
import { ShoppingListItem_Item$key } from '../__generated__/ShoppingListItem_Item.graphql'
import { memo, useCallback } from 'react'
import { ShoppingListItem_RemoveMutation } from '../__generated__/ShoppingListItem_RemoveMutation.graphql'
import { ShoppingListItem_UpdateMutation } from '../__generated__/ShoppingListItem_UpdateMutation.graphql'

interface IShoppingListItemProps {
  shoppingListItemFragmentRef: ShoppingListItem_Item$key
  connectionId: string
}

function ShoppingListItem ({ shoppingListItemFragmentRef, connectionId }: IShoppingListItemProps) {
  const item = useFragment(graphql`
    fragment ShoppingListItem_Item on ShoppingListItem {
      id
      title
      completed
    }
  `, shoppingListItemFragmentRef)

  const [deleteItem] = useMutation<ShoppingListItem_RemoveMutation>(graphql`
    mutation ShoppingListItem_RemoveMutation($input: DeleteShoppingListItemInput!, $connectionIds: [ID!]!) {
      deleteShoppingListItem(input: $input) {
        shoppingListItem @deleteEdge(connections: $connectionIds) {
          id @deleteRecord
          ...ShoppingListItem_Item
        }
      }
    }
  `)

  const [updateItem] = useMutation<ShoppingListItem_UpdateMutation>(graphql`
    mutation ShoppingListItem_UpdateMutation($input: UpdateShoppingListItemInput!) {
      updateShoppingListItem(input: $input) {
        shoppingListItem {
          ...ShoppingListItem_Item
        }
      }
    }
  `)

  const remove = useCallback(() => {
    deleteItem({
      variables: {
        input: { shoppingListItem: item.id },
        connectionIds: connectionId ? [connectionId] : []
      }
    })
  }, [deleteItem, item?.id, connectionId])

  const toggleCompleted = useCallback(() => {
    updateItem({
      variables: {
        input: {
          shoppingListItem: item.id,
          completed: !item.completed
        }
      }
    })
  }, [updateItem, item?.id, item?.completed])

  if (!item) return null

  return <ListItem button onClick={toggleCompleted}>
    <ListItemIcon>
      {item.completed ? <CheckBox /> : <CheckBoxOutlineBlank />}
    </ListItemIcon>
    <ListItemText>
      {item.title}
    </ListItemText>
    <ListItemSecondaryAction>
      <IconButton onClick={remove}>
        <ClearAll />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
}

export default memo(ShoppingListItem)
