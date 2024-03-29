import { useForm } from 'react-hook-form'
import { graphql, useMutation } from 'react-relay'
import { ShoppingListAddItem_Mutation } from '../__generated__/ShoppingListAddItem_Mutation.graphql'
import { memo, useCallback } from 'react'
import { IconButton, TextField } from '@mui/material'
import { Send } from '@mui/icons-material'

interface IShoppingListAddItemProps {
  connectionId?: string
  shoppingListId: string
}

interface FormValues {
  title: string
}

function ShoppingListAddItem ({ connectionId, shoppingListId }: IShoppingListAddItemProps) {
  const { handleSubmit, register, reset } = useForm<FormValues>()

  const [commitAdd] = useMutation<ShoppingListAddItem_Mutation>(graphql`
    mutation ShoppingListAddItem_Mutation($input: CreateShoppingListItemInput!, $connectionIds: [ID!]!) {
      createShoppingListItem(input: $input) {
        shoppingListItem @prependNode(connections: $connectionIds, edgeTypeName: "QueryShoppingListItemsConnectionEdge") {
          id
          ...ShoppingListItem_Item
        }
      }
    }
  `)

  const add = useCallback((data: FormValues) => {
    commitAdd({
      variables: {
        input: {
          title: data.title,
          shoppingList: shoppingListId
        },
        connectionIds: connectionId ? [connectionId] : []
      }
    })
    reset()
  }, [commitAdd, connectionId, reset, shoppingListId])

  return (
    <form onSubmit={handleSubmit(add)} style={{ width: '100%' }}>
      <TextField
        {...register('title', {
          required: true
        })}
        fullWidth
        placeholder="Add something..."
        InputProps={{
          endAdornment: <IconButton type="submit">
            <Send />
          </IconButton>
        }}
      />
    </form>
  )
}

export default memo(ShoppingListAddItem)
