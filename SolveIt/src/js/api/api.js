import { get } from "../../utility/utility.js";

export async function getAPI(api) {
  const API = await get(api);

  return API;
}
