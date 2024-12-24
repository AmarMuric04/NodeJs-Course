import { get } from "../../utility/utility.js";

export async function getAPI() {
  const API = await get("../assets/api.json");

  return API;
}
