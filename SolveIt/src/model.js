import { get } from "./utility/fetch.js";

export async function getReviews() {
  const reviews = await get("./assets/reviews.json");

  return reviews;
}
