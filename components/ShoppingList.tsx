import {graphql, useLazyLoadQuery, useMutation} from "react-relay";
import {Fragment, useCallback} from "react";
import {ShoppingList_AddMutation} from "../__generated__/ShoppingList_AddMutation.graphql";
import {ShoppingList_Query} from "../__generated__/ShoppingList_Query.graphql";
import {Button, IconButton, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText} from "@mui/material";
import ClearAll from "@mui/icons-material/ClearAll";
import CheckBoxOutlineBlank from "@mui/icons-material/CheckBoxOutlineBlank";

export default function ShoppingList() {
    const data = useLazyLoadQuery<ShoppingList_Query>(graphql`
      query ShoppingList_Query {
        shoppingList(first: 20) @connection(key: "main_shoppingList") {
          __id
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
    const connectionId = data?.shoppingList?.__id
    console.log('connectionId', connectionId)

    const [commitAdd] = useMutation<ShoppingList_AddMutation>(graphql`
      mutation ShoppingList_AddMutation($input: CreateShoppingListItemInput!, $connectionIds: [ID!]!) {
        createShoppingListItem(input: $input) {
          shoppingListItem @prependNode(connections: $connectionIds, edgeTypeName: "QueryShoppingListConnectionEdge") {
            id
            ... on ShoppingListItem {
              title
            }
          }
        }
      }
    `)

    const add = useCallback(() => {
        commitAdd({
            variables: {
                input: {
                    title: "Hello world",
                },
                connectionIds: connectionId ? [connectionId] : []
            },
        })
    }, [commitAdd, connectionId])

    return <Fragment>
        <List>
            {data?.shoppingList?.edges?.map(item => (
                item === null ? null : (
                    <ListItem key={item.node.id}>
                        <ListItemIcon>
                            <CheckBoxOutlineBlank />
                        </ListItemIcon>
                        <ListItemText>
                            {item.node.title}
                        </ListItemText>
                        <ListItemSecondaryAction>
                            <IconButton>
                                <ClearAll />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                )
            ))}
        </List>
        <Button onClick={add}>Add</Button>
    </Fragment>
}
