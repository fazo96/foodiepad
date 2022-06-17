/**
 * @generated SignedSource<<ae257358404d2a73a0b0f26d95692dad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type test_Query$variables = {};
export type test_Query$data = {
  readonly shoppingList: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
  }>;
};
export type test_Query = {
  response: test_Query$data;
  variables: test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ShoppingListItem",
    "kind": "LinkedField",
    "name": "shoppingList",
    "plural": true,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "test_Query",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "test_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "5cd0ca9f772f9a6bbdcbac2824aa83c6",
    "id": null,
    "metadata": {},
    "name": "test_Query",
    "operationKind": "query",
    "text": "query test_Query {\n  shoppingList {\n    id\n    title\n  }\n}\n"
  }
};
})();

(node as any).hash = "1acf22b66509bee3508ffc9e73824f74";

export default node;
