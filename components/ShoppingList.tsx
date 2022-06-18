import {graphql, useLazyLoadQuery, useMutation} from "react-relay";
import {useCallback} from "react";
import {ShoppingList_AddMutation} from "../__generated__/ShoppingList_AddMutation.graphql";
import {ShoppingList_Query} from "../__generated__/ShoppingList_Query.graphql";

export default function ShoppingList() {
    const data = useLazyLoadQuery<ShoppingList_Query>(graphql`
      query ShoppingList_Query {
        shoppingList(first: 20) {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `, {}, {
        fetchPolicy: 'store-and-network'
    })

    const [commitAdd] = useMutation<ShoppingList_AddMutation>(graphql`
      mutation ShoppingList_AddMutation($input: ShoppingListItemInput!) {
        createShoppingListItem(input: $input) {
          id
          title
        }
      }
    `)

    const add = useCallback(() => {
        commitAdd({
            variables: { input: { title: "Hello world" } },
        })
    }, [commitAdd])

    return <div>
        Element count: {data?.shoppingList?.edges?.length ?? '?'}
        <ul>
            {data?.shoppingList?.edges?.map(item => (
                item === null ? null : (
                    <li key={item.node.id}>{item.node.title}</li>
                )
            ))}
        </ul>
        <button onClick={add}>Add</button>
    </div>
}
