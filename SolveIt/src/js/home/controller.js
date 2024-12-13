import { disableButton } from "../../utility/utility.js";
import { initializeHeader } from "../header_logic.js";
import { handleNavBarHover, handleUnderlineHover } from "../general_view.js";

import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = {
  handleNextReview(reviewsParent, scrollAmount, scrollIndex) {
    if (scrollIndex % 5 == 0)
      reviewsParent.append(reviewsParent.firstElementChild);
    reviewsParent.scrollTo({
      left: reviewsParent.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  },

  handlePrevReview(reviewsParent, scrollAmount, scrollIndex) {
    if (scrollIndex % 5 == 0)
      reviewsParent.prepend(reviewsParent.lastElementChild);
    reviewsParent.scrollTo({
      left: reviewsParent.scrollLeft - scrollAmount,
      behavior: "smooth",
    });
  },

  async init() {
    initializeHeader();
    handleUnderlineHover();
    handleNavBarHover();
    
    const reviews = await Model.getReviews();
    View.renderReviews(reviews);

    const reviewsParent = document.querySelector(".reviews");
    const scrollAmount = reviewsParent.firstElementChild.offsetWidth;

    const nextButton = document.querySelector(".next-button");
    const prevButton = document.querySelector(".prev-button");

    let scrollIndex = 1;

    nextButton.addEventListener("click", () => {
      if (scrollIndex != reviews.length) scrollIndex++;
      this.handleNextReview(reviewsParent, scrollAmount, scrollIndex);
      disableButton(nextButton);
    });
    prevButton.addEventListener("click", () => {
      if (scrollIndex != 0) scrollIndex--;
      this.handlePrevReview(reviewsParent, scrollAmount, scrollIndex);
      disableButton(prevButton);
    });
  },
};
