import { Client } from "@gadget-client/shop-dev001";

export const api = new Client({ environment: window.gadgetConfig.environment });
