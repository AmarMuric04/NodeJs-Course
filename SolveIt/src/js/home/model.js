import { get } from "../../utility/utility.js";

export async function getReviews() {
  const reviews = await get("../assets/reviews.json");

  return reviews;
}
