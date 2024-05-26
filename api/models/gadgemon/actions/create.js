import { applyParams, save, ActionOptions, CreateGadgemonActionContext } from "gadget-server";

/**
 * @param { CreateGadgemonActionContext } context
 */
export async function run({ params, record, logger, api }) {
  applyParams(params, record);
  await save(record);
}

/**
 * @param { CreateGadgemonActionContext } context
 */
export async function onSuccess({ params, record, logger, api, connections }) {
  // "record" is the newly created Gadgemon, with name, similar and element fields that will be added by the user
  const { id, name, similar, element } = record;

  // prompt sent to OpenAI to generate the Gadgemon sprite
  const prompt = `A pixel art style pokemon sprite named ${name} that looks similar to a ${similar} that is a ${element} element. Do not include any text, including the name, in the image`;

  // call the OpenAI images generate (DALL-E) API: https://github.com/openai/openai-node/blob/v4/src/resources/images.ts
  const response = await connections.openai.images.generate({
    prompt,
    n: 1,
    size: "256x256",
    response_format: "url",
  });

  const imageUrl = response.data[0].url;

  // write to the Gadget Logs
  logger.info({ imageUrl }, `Generated image URL for Gadgemon id ${id}`);

  // save the image file to the newly created Gadgémon record
  await api.gadgemon.update(id, {
    gadgemon: {
      sprite: {
        copyURL: imageUrl,
      },
    },
  });
}

/** @type { ActionOptions } */
export const options = {
  actionType: "create",
};