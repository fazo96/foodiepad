/**
 * @generated SignedSource<<573b4f083999e8cb85a556a2e5ead0d3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateShoppingListItemInput = {
  completed?: boolean | null;
  shoppingListItem: string;
  title?: string | null;
};
export type ShoppingListItem_UpdateMutation$variables = {
  input: UpdateShoppingListItemInput;
};
export type ShoppingListItem_UpdateMutation$data = {
  readonly updateShoppingListItem: {
    readonly shoppingListItem: {
      readonly " $fragmentSpreads": FragmentRefs<"ShoppingListItem_Item">;
    };
  };
};
export type ShoppingListItem_UpdateMutation = {
  response: ShoppingListItem_UpdateMutation$data;
  variables: ShoppingListItem_UpdateMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ShoppingListItem_UpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateShoppingListItemPayload",
        "kind": "LinkedField",
        "name": "updateShoppingListItem",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ShoppingListItem_UpdateMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateShoppingListItemPayload",
        "kind": "LinkedField",
        "name": "updateShoppingListItem",
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
    "cacheID": "607091c7a1c1b00445492a79bc086233",
    "id": null,
    "metadata": {},
    "name": "ShoppingListItem_UpdateMutation",
    "operationKind": "mutation",
    "text": "mutation ShoppingListItem_UpdateMutation(\n  $input: UpdateShoppingListItemInput!\n) {\n  updateShoppingListItem(input: $input) {\n    shoppingListItem {\n      ...ShoppingListItem_Item\n      id\n    }\n  }\n}\n\nfragment ShoppingListItem_Item on ShoppingListItem {\n  id\n  title\n  completed\n}\n"
  }
};
})();

(node as any).hash = "f124d95013c981cfa094952d59ee666b";

export default node;
