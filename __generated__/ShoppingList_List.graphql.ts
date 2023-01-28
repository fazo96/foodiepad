/**
 * @generated SignedSource<<480325b5a2a991e8beab731aef3a859b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShoppingList_List$data = {
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "ShoppingList_List";
};
export type ShoppingList_List$key = {
  readonly " $data"?: ShoppingList_List$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShoppingList_List">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShoppingList_List",
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
  "type": "ShoppingList",
  "abstractKey": null
};

(node as any).hash = "36cc4088cd3e81e4748dc87a66a6a7a7";

export default node;
