/**
 * @generated SignedSource<<f55ce197645035b4885a82b5a1555483>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteShoppingListItemInput = {
  shoppingListItem: string;
};
export type ShoppingListItem_RemoveMutation$variables = {
  connectionIds: ReadonlyArray<string>;
  input: DeleteShoppingListItemInput;
};
export type ShoppingListItem_RemoveMutation$data = {
  readonly deleteShoppingListItem: {
    readonly shoppingListItem: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"ShoppingListItem_Item">;
    };
  };
};
export type ShoppingListItem_RemoveMutation = {
  response: ShoppingListItem_RemoveMutation$data;
  variables: ShoppingListItem_RemoveMutation$variables;
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
    "name": "ShoppingListItem_RemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "DeleteShoppingListItemPayload",
        "kind": "LinkedField",
        "name": "deleteShoppingListItem",
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
    "name": "ShoppingListItem_RemoveMutation",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "DeleteShoppingListItemPayload",
        "kind": "LinkedField",
        "name": "deleteShoppingListItem",
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
                "filters": null,
                "handle": "deleteRecord",
                "key": "",
                "kind": "ScalarHandle",
                "name": "id"
              },
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3737e0529cdccaf2967e7bccac76b9b5",
    "id": null,
    "metadata": {},
    "name": "ShoppingListItem_RemoveMutation",
    "operationKind": "mutation",
    "text": "mutation ShoppingListItem_RemoveMutation(\n  $input: DeleteShoppingListItemInput!\n) {\n  deleteShoppingListItem(input: $input) {\n    shoppingListItem {\n      id\n      ...ShoppingListItem_Item\n    }\n  }\n}\n\nfragment ShoppingListItem_Item on ShoppingListItem {\n  id\n  title\n  completed\n}\n"
  }
};
})();

(node as any).hash = "e51b0e4919d06d80f2291fdaee94c103";

export default node;
