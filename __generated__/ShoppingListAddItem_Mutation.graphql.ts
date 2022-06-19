/**
 * @generated SignedSource<<1f6173dbf48ec3c103c7a8d00bffb71b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateShoppingListItemInput = {
  title: string;
};
export type ShoppingListAddItem_Mutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: CreateShoppingListItemInput;
};
export type ShoppingListAddItem_Mutation$data = {
  readonly createShoppingListItem: {
    readonly shoppingListItem: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"ShoppingListItem_Item">;
    };
  };
};
export type ShoppingListAddItem_Mutation = {
  response: ShoppingListAddItem_Mutation$data;
  variables: ShoppingListAddItem_Mutation$variables;
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
  "kind": "ScalarField",
  "name": "id",
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
    "name": "ShoppingListAddItem_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateShoppingListItemPayload",
        "kind": "LinkedField",
        "name": "createShoppingListItem",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ShoppingListItem",
            "kind": "LinkedField",
            "name": "shoppingListItem",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ShoppingListItem_Item"
              }
            ],
            "storageKey": null
          }
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
    "name": "ShoppingListAddItem_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateShoppingListItemPayload",
        "kind": "LinkedField",
        "name": "createShoppingListItem",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ShoppingListItem",
            "kind": "LinkedField",
            "name": "shoppingListItem",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "completed",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
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
    "cacheID": "f973b134338253bedcb8ee35f75fb930",
    "id": null,
    "metadata": {},
    "name": "ShoppingListAddItem_Mutation",
    "operationKind": "mutation",
    "text": "mutation ShoppingListAddItem_Mutation(\n  $input: CreateShoppingListItemInput!\n) {\n  createShoppingListItem(input: $input) {\n    shoppingListItem {\n      id\n      ...ShoppingListItem_Item\n    }\n  }\n}\n\nfragment ShoppingListItem_Item on ShoppingListItem {\n  id\n  title\n  completed\n}\n"
  }
};
})();

(node as any).hash = "c2d94c5602fd698a89bc8c5e80c08968";

export default node;
