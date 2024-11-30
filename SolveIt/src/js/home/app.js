import { handleNextReview, handlePrevReview } from "./controller.js";

import { getReviews } from "./model.js";
import { disableButton } from "../../utility/utility.js";
import { renderReviews } from "./view.js";
import { initializeHeader } from "../header_logic.js";
import { handleUnderlineHover } from "../general_view.js";

async function initializeApp() {
  const reviews = await getReviews();
  renderReviews(reviews);

  const reviewsParent = document.querySelector(".reviews");
  const scrollAmount = reviewsParent.firstElementChild.offsetWidth;

  const nextButton = document.querySelector(".next-button");
  const prevButton = document.querySelector(".prev-button");

  let scrollIndex = 1;

  nextButton.addEventListener("click", () => {
    if (scrollIndex != reviews.length) scrollIndex++;
    handleNextReview(reviewsParent, scrollAmount, scrollIndex);
    disableButton(nextButton);
  });
  prevButton.addEventListener("click", () => {
    if (scrollIndex != 0) scrollIndex--;
    handlePrevReview(reviewsParent, scrollAmount, scrollIndex);
    disableButton(prevButton);
  });

  initializeHeader();
  handleUnderlineHover();
}

initializeApp();
