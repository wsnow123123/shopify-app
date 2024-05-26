import { deleteRecord, ActionOptions, DeleteGadgetActionContext } from "gadget-server";

/**
 * @param { DeleteGadgetActionContext } context
 */
export async function run({ params, record, logger, api, connections }) {
  await deleteRecord(record);
};

/**
 * @param { DeleteGadgetActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // Your logic goes here
};

/** @type { ActionOptions } */
export const options = {
  actionType: "delete"
};
