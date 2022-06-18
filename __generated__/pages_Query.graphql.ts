/**
 * @generated SignedSource<<de7ea24c093048bbef323bf1d1640701>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type pages_Query$variables = {};
export type pages_Query$data = {
  readonly shoppingList: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly title: string;
      };
    } | null>;
  };
};
export type pages_Query = {
  response: pages_Query$data;
  variables: pages_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Literal",
        "name": "first",
        "value": 20
      }
    ],
    "concreteType": "QueryShoppingListConnection",
    "kind": "LinkedField",
    "name": "shoppingList",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "QueryShoppingListConnectionEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ShoppingListItem",
            "kind": "LinkedField",
            "name": "node",
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
        ],
        "storageKey": null
      }
    ],
    "storageKey": "shoppingList(first:20)"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pages_Query",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "pages_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "db48a1f574863f68bfa420f78a801278",
    "id": null,
    "metadata": {},
    "name": "pages_Query",
    "operationKind": "query",
    "text": "query pages_Query {\n  shoppingList(first: 20) {\n    edges {\n      node {\n        id\n        title\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cc6490390fc7fa9c61c7e318a89a0c27";

export default node;
