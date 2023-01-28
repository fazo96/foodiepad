/**
 * @generated SignedSource<<82cf51f7092dbdd3badd4e70dd63ac08>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateShoppingListInput = {
  title: string;
};
export type CreateShoppingList_Mutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: CreateShoppingListInput;
};
export type CreateShoppingList_Mutation$data = {
  readonly createShoppingList: {
    readonly shoppingList: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"ShoppingList_List">;
    };
  };
};
export type CreateShoppingList_Mutation = {
  response: CreateShoppingList_Mutation$data;
  variables: CreateShoppingList_Mutation$variables;
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
    "name": "CreateShoppingList_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateShoppingListPayload",
        "kind": "LinkedField",
        "name": "createShoppingList",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ShoppingList",
            "kind": "LinkedField",
            "name": "shoppingList",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ShoppingList_List"
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
    "name": "CreateShoppingList_Mutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CreateShoppingListPayload",
        "kind": "LinkedField",
        "name": "createShoppingList",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ShoppingList",
            "kind": "LinkedField",
            "name": "shoppingList",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
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
            "name": "shoppingList",
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
    "cacheID": "70fff9e4d99b2e88338dd984652d61ba",
    "id": null,
    "metadata": {},
    "name": "CreateShoppingList_Mutation",
    "operationKind": "mutation",
    "text": "mutation CreateShoppingList_Mutation(\n  $input: CreateShoppingListInput!\n) {\n  createShoppingList(input: $input) {\n    shoppingList {\n      id\n      ...ShoppingList_List\n    }\n  }\n}\n\nfragment ShoppingList_List on ShoppingList {\n  id\n  title\n}\n"
  }
};
})();

(node as any).hash = "15881f11238e0f656a755a361cb9da4c";

export default node;
