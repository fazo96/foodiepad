import { useForm } from 'react-hook-form'
import { graphql, useMutation } from 'react-relay'
import { memo, useCallback } from 'react'
import { IconButton, TextField } from '@mui/material'
import { Send } from '@mui/icons-material'
import { CreateShoppingList_Mutation } from '../__generated__/CreateShoppingList_Mutation.graphql'

interface ICreateShoppingListProps {
  connectionId?: string
}

interface FormValues {
  title: string
}

function CreateShoppingList ({ connectionId }: ICreateShoppingListProps) {
  const { handleSubmit, register, reset } = useForm<FormValues>()

  const [commitAdd] = useMutation<CreateShoppingList_Mutation>(graphql`
    mutation CreateShoppingList_Mutation($input: CreateShoppingListInput!, $connectionIds: [ID!]!) {
      createShoppingList(input: $input) {
        shoppingList @prependNode(connections: $connectionIds, edgeTypeName: "QueryShoppingListConnectionEdge") {
          id
          ...ShoppingList_List
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
        placeholder="Create a list..."
        InputProps={{
          endAdornment: <IconButton type="submit">
            <Send />
          </IconButton>
        }}
      />
    </form>
  )
}

export default memo(CreateShoppingList)
