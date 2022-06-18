/**
 * @generated SignedSource<<0451e377982553fc1ef1e967b39ebf60>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateShoppingListItemInput = {
  title: string;
};
export type ShoppingList_AddMutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: CreateShoppingListItemInput;
};
export type ShoppingList_AddMutation$data = {
  readonly createShoppingListItem: {
    readonly shoppingListItem: {
      readonly id: string;
      readonly title: string;
    };
  };
};
export type ShoppingList_AddMutation = {
  response: ShoppingList_AddMutation$data;
  variables: ShoppingList_AddMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connectionIds"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "ShoppingListItem",
  "kind": "LinkedField",
  "name": "shoppingListItem",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ShoppingList_AddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateShoppingListItemPayload",
        "kind": "LinkedField",
        "name": "createShoppingListItem",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ShoppingList_AddMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateShoppingListItemPayload",
        "kind": "LinkedField",
        "name": "createShoppingListItem",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "shoppingListItem",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connectionIds"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "QueryShoppingListConnectionEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "98fd7688452719c416aa8c9163182b23",
    "id": null,
    "metadata": {},
    "name": "ShoppingList_AddMutation",
    "operationKind": "mutation",
    "text": "mutation ShoppingList_AddMutation(\n  $input: CreateShoppingListItemInput!\n) {\n  createShoppingListItem(input: $input) {\n    shoppingListItem {\n      id\n      title\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "374a191af3c19167ea953556b1466923";

export default node;
