/**
 * @generated SignedSource<<17df00e84c56695e11beb37e0cdad8bd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ShoppingList_Query$variables = {};
export type ShoppingList_Query$data = {
  readonly shoppingList: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly title: string;
      };
    } | null>;
  };
};
export type ShoppingList_Query = {
  response: ShoppingList_Query$data;
  variables: ShoppingList_Query$variables;
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
    "name": "ShoppingList_Query",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShoppingList_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "0190ba7369f922fcd667450254d0e0d3",
    "id": null,
    "metadata": {},
    "name": "ShoppingList_Query",
    "operationKind": "query",
    "text": "query ShoppingList_Query {\n  shoppingList(first: 20) {\n    edges {\n      node {\n        id\n        title\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9dde3b65430bc45154dc8a8750a76017";

export default node;
