import {
  handleThemeHoverIn,
  handleThemeHoverOut,
  handleNextReview,
  handlePrevReview,
  handleDropdownClick,
  handleNavHoverIn,
  handleNavHoverOut,
} from "./controller.js";

import { getReviews } from "./model.js";
import { renderReviews } from "./view.js";

async function initializeApp() {
  // Theme interactions
  const themeBtn = document.querySelector(".theme-js");
  themeBtn.addEventListener("mouseover", handleThemeHoverIn);
  themeBtn.addEventListener("mouseout", handleThemeHoverOut);

  // Reviews carousel
  const reviews = await getReviews();
  renderReviews(reviews);

  const reviewsParent = document.querySelector(".reviews");
  const scrollAmount = reviewsParent.firstElementChild.offsetWidth;

  const nextButton = document.querySelector(".next-button");
  const prevButton = document.querySelector(".prev-button");

  nextButton.addEventListener("click", () =>
    handleNextReview(reviewsParent, scrollAmount)
  );
  prevButton.addEventListener("click", () =>
    handlePrevReview(reviewsParent, scrollAmount)
  );

  // Dropdown interactions
  const dropdowns = document.querySelectorAll(".drop");
  dropdowns.forEach((drop) =>
    drop.addEventListener("click", () => handleDropdownClick(drop, dropdowns))
  );

  // Nav hover interactions
  const navParents = document.querySelectorAll(".nav-parent");
  navParents.forEach((navParent) => {
    navParent.addEventListener("mouseenter", () => handleNavHoverIn(navParent));
    navParent.addEventListener("mouseleave", () =>
      handleNavHoverOut(navParent)
    );
  });
}

initializeApp();
