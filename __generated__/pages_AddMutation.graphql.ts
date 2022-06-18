/**
 * @generated SignedSource<<0f4373e2480d493f97aac457c1583117>>
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
export type pages_AddMutation$variables = {
  input: ShoppingListItemInput;
};
export type pages_AddMutation$data = {
  readonly createShoppingListItem: {
    readonly id: string;
    readonly title: string;
  };
};
export type pages_AddMutation = {
  response: pages_AddMutation$data;
  variables: pages_AddMutation$variables;
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
    "name": "pages_AddMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "pages_AddMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4755da2ed1ebf73e5806d2b64c963ecb",
    "id": null,
    "metadata": {},
    "name": "pages_AddMutation",
    "operationKind": "mutation",
    "text": "mutation pages_AddMutation(\n  $input: ShoppingListItemInput!\n) {\n  createShoppingListItem(input: $input) {\n    id\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "7168d0d280ceb9fa9d530b89a3ca3afa";

export default node;
