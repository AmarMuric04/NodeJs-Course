import { get } from "../../utility/utility.js";

export const Model = {
  async getReviews() {
    const reviews = await get("./assets/reviews.json");

    return reviews.reviews;
  },
};
