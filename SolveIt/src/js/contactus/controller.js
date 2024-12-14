import { initializeHeader } from "../header_logic.js";
import { handleNavBarHover, handleUnderlineHover } from "../general_view.js";
import * as Utility from "../../utility/utility.js";
import * as Validation from "../../utility/inputs.js";
import { View } from "./view.js";

export const Controller = {
  handleSubmitReview(inputs, form) {
    const emailDoc = document.getElementById("review-email");
    const firstDoc = document.getElementById("review-first-name");
    const lastDoc = document.getElementById("review-last-name");
    const numDoc = document.getElementById("review-number");
    const revDoc = document.getElementById("review");
    const submitBtn = form.querySelector("button");

    let invalidInput = false;
    let inputInvalidations;

    clearTimeout(inputInvalidations);

    if (!Validation.isEmailValid(inputs["review-email"])) {
      Validation.invalidateInput(emailDoc);
      Utility.removeClassOnClick(emailDoc, "error-input");
      invalidInput = true;
    }
    if (Validation.isInputEmpty(inputs["review-first-name"])) {
      Validation.invalidateInput(firstDoc);
      Utility.removeClassOnClick(firstDoc, "error-input");
      invalidInput = true;
    }
    if (Validation.isInputEmpty(inputs["review-last-name"])) {
      Validation.invalidateInput(lastDoc);
      Utility.removeClassOnClick(lastDoc, "error-input");
      invalidInput = true;
    }
    if (!Validation.isValidPhoneNumber(inputs["review-number"])) {
      Validation.invalidateInput(numDoc);
      Utility.removeClassOnClick(numDoc, "error-input");
      invalidInput = true;
    }
    if (Validation.isInputEmpty(inputs["review"])) {
      Validation.invalidateInput(revDoc);
      Utility.removeClassOnClick(revDoc, "error-input");
      invalidInput = true;
    }

    inputInvalidations = setTimeout(() => {
      Validation.removeInvalidations(form);
    }, 1000);

    if (invalidInput) return;

    Validation.removeInvalidations(form);
    View.updateButtonSubmit(submitBtn);

    /* Send the review to the database, for now just redirect */

    /* Send it to localstorage for appreciation page :) */
    localStorage.setItem("SolveBox-review-session", JSON.stringify(inputs));

    setTimeout(() => {
      form.reset();
    }, 1500);

    setTimeout(() => {
      window.location.href = "./appreciation.html";
    }, 3000);

    Validation.removeInvalidations(form);
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

  init() {
    const form = document.getElementById("review-form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = Utility.retrieveFormData(e);

      this.handleSubmitReview(inputs, form);
    });

    const newsForm = document.getElementById("news-form");

    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputs = Utility.retrieveFormData(e);

      this.handleNewsletterSubscribe(inputs, newsForm);
    });

    initializeHeader();
    handleUnderlineHover();
    handleNavBarHover();
  },
};
