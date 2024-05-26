import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "gagdemon" model, go to https://shop-dev001.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "d1137mAuDjbC",
  fields: {
    element: {
      type: "enum",
      acceptMultipleSelections: false,
      acceptUnlistedOptions: false,
      options: ["grass", "fire", "water"],
      storageKey: "N62wmbEzCN3E",
    },
    name: { type: "string", storageKey: "Qof0kf18ShLQ" },
    similar: { type: "string", storageKey: "BsahZ5c3BkME" },
    sprite: {
      type: "file",
      allowPublicAccess: false,
      storageKey: "FgXDlsdhi7o2",
    },
  },
};
