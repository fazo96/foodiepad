/**
 * @generated SignedSource<<f37a8863d8cceba27c7b43c129e61e28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShoppingListItem_Item$data = {
  readonly completed: boolean;
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "ShoppingListItem_Item";
};
export type ShoppingListItem_Item$key = {
  readonly " $data"?: ShoppingListItem_Item$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShoppingListItem_Item">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShoppingListItem_Item",
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
  "type": "ShoppingListItem",
  "abstractKey": null
};

(node as any).hash = "84bca3898aecd77bf9aa4110e5b6b3a6";

export default node;
