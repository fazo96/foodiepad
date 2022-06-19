import { useForm } from 'react-hook-form'
import { graphql, useMutation } from 'react-relay'
import { ShoppingListAddItem_Mutation } from '../__generated__/ShoppingListAddItem_Mutation.graphql'
import { useCallback } from 'react'
import { IconButton, TextField } from '@mui/material'
import { Send } from '@mui/icons-material'

interface IShoppingListAddItemProps {
  connectionId?: string
}

interface FormValues {
  title: string
}

export default function ShoppingListAddItem ({ connectionId }: IShoppingListAddItemProps) {
  const { handleSubmit, register, reset } = useForm<FormValues>()

  const [commitAdd] = useMutation<ShoppingListAddItem_Mutation>(graphql`
    mutation ShoppingListAddItem_Mutation($input: CreateShoppingListItemInput!, $connectionIds: [ID!]!) {
      createShoppingListItem(input: $input) {
        shoppingListItem @prependNode(connections: $connectionIds, edgeTypeName: "QueryShoppingListConnectionEdge") {
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
          title: data.title
        },
        connectionIds: connectionId ? [connectionId] : []
      }
    })
    reset()
  }, [commitAdd, connectionId, reset])

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
