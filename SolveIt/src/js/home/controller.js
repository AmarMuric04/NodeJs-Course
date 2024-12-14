import * as Utility from "../../utility/utility.js";
import * as Validation from "../../utility/inputs.js";
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

  handleNewsletterSubscribe(inputs, form) {
    const emailDoc = document.getElementById("email");
    const nameDoc = document.getElementById("name");
    const numDoc = document.getElementById("number");
    const subBtn = form.querySelector("button");

    let invalidInput;
    let inputInvalidations;

    clearTimeout(inputInvalidations);

    if (!Validation.isEmailValid(inputs.email)) {
      Validation.invalidateInput(emailDoc);
      Utility.removeClassOnClick(emailDoc, "error-input");
      invalidInput = true;
    }
    if (!Validation.isValidPhoneNumber(inputs.number)) {
      Validation.invalidateInput(numDoc);
      Utility.removeClassOnClick(numDoc, "error-input");
      invalidInput = true;
    }
    if (Validation.isInputEmpty(inputs.name)) {
      Validation.invalidateInput(nameDoc);
      Utility.removeClassOnClick(nameDoc, "error-input");
      invalidInput = true;
    }

    inputInvalidations = setTimeout(() => {
      Validation.removeInvalidations(form);
    }, 1000);

    if (invalidInput) return;

    View.updateButtonStatus(subBtn);

    setTimeout(() => {
      form.reset();
    }, 3000);
  },

  async init() {
    initializeHeader();
    handleUnderlineHover();
    handleNavBarHover();

    const newsForm = document.getElementById("news-form");

    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputs = Utility.retrieveFormData(e);

      this.handleNewsletterSubscribe(inputs, newsForm);
    });

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
      Utility.disableButton(nextButton);
    });
    prevButton.addEventListener("click", () => {
      if (scrollIndex != 0) scrollIndex--;
      this.handlePrevReview(reviewsParent, scrollAmount, scrollIndex);
      Utility.disableButton(prevButton);
    });
  },
};
