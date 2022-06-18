/**
 * @generated SignedSource<<c1dc7d4f8b0a0a5490873fb4183a86dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ShoppingListItemInput = {
  title: string;
};
export type ShoppingList_AddMutation$variables = {
  input: ShoppingListItemInput;
};
export type ShoppingList_AddMutation$data = {
  readonly createShoppingListItem: {
    readonly id: string;
    readonly title: string;
  };
};
export type ShoppingList_AddMutation = {
  response: ShoppingList_AddMutation$data;
  variables: ShoppingList_AddMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "ShoppingListItem",
    "kind": "LinkedField",
    "name": "createShoppingListItem",
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
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ShoppingList_AddMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShoppingList_AddMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e0d1057f5b1afae5daf51ae67ab86140",
    "id": null,
    "metadata": {},
    "name": "ShoppingList_AddMutation",
    "operationKind": "mutation",
    "text": "mutation ShoppingList_AddMutation(\n  $input: ShoppingListItemInput!\n) {\n  createShoppingListItem(input: $input) {\n    id\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "483f30d6b610a2aaa2d53ae99a62b386";

export default node;
