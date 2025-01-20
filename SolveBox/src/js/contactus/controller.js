import { handleUnderlineHover } from "../general_view.js";
import * as Utility from "../../utility/utility.js";
import * as Validation from "../../utility/inputs.js";
import { loader } from "../general_view.js";
import { View } from "./view.js";
import { allowLangChange, getLang } from "../language.js";

let lang = localStorage.getItem("SolveBox-current-language");

window.addEventListener("localStorageChange", (event) => {
  lang = event.newValue;
});
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

    if (!Validation.isMontenegroEmail(inputs["review-email"])) {
      Validation.invalidateInput(emailDoc);
      Utility.removeClassOnClick(emailDoc, "error-input");
      View.showError(
        emailDoc,
        "Email isn't valid, please check requirements.",
        "Имејл није валидан, молимо проверите захтеве."
      );
      invalidInput = true;
    }

    if (!Validation.isFirstNameValid(inputs["review-first-name"])) {
      Validation.invalidateInput(firstDoc);
      Utility.removeClassOnClick(firstDoc, "error-input");
      View.showError(
        firstDoc,
        "First name isn't valid, please check requirements.",
        "Име није валидно, молимо проверите захтеве."
      );
      invalidInput = true;
    }

    if (!Validation.isFirstNameValid(inputs["review-last-name"])) {
      Validation.invalidateInput(lastDoc);
      Utility.removeClassOnClick(lastDoc, "error-input");
      View.showError(
        lastDoc,
        "Last name isn't valid, please check requirements.",
        "Презиме није валидно, молимо проверите захтеве."
      );
      invalidInput = true;
    }

    if (
      inputs["review-number"] !== "" &&
      !Validation.isValidPhoneNumber(inputs["review-number"])
    ) {
      Validation.invalidateInput(numDoc);
      Utility.removeClassOnClick(numDoc, "error-input");
      View.showError(
        revDoc,
        "Number isn't valid, please check requirements or remove it.",
        "Број телефона није валидан, молимо проверите захтеве или га обрињите."
      );
      invalidInput = true;
    }

    if (!Validation.isLessThanOrEqualTo255WithoutNumbers(inputs["review"])) {
      Validation.invalidateInput(revDoc);
      Utility.removeClassOnClick(revDoc, "error-input");
      View.showError(
        revDoc,
        "Review isn't valid, please check requirements.",
        "Рецензија није валидна, молимо проверите захтеве."
      );
      invalidInput = true;
    }

    setTimeout(() => {
      Validation.removeInvalidations(form);
    }, 1000);

    if (invalidInput) {
      allowLangChange();

      lang === "english"
        ? Utility.updateButtonStatus(submitBtn, "Oops!", true)
        : Utility.updateButtonStatus(submitBtn, "Упс!", true);
      setTimeout(() => {
        lang === "english"
          ? Utility.updateButtonStatus(submitBtn, "Submit")
          : Utility.updateButtonStatus(submitBtn, "Пошаљи");
      }, 1000);
      return;
    }

    lang === "english"
      ? Utility.updateButtonStatus(submitBtn, "Submitting... " + loader(), true)
      : Utility.updateButtonStatus(submitBtn, "Шаљемо... " + loader(), true);

    setTimeout(() => {
      lang === "english"
        ? Utility.updateButtonStatus(submitBtn, "Submitted 😀")
        : Utility.updateButtonStatus(submitBtn, "Послато 😀");
    }, 3000);
    setTimeout(() => {
      lang === "english"
        ? Utility.updateButtonStatus(submitBtn, "Submit")
        : Utility.updateButtonStatus(submitBtn, "Пошаљи");
    }, 6000);

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
      subBtn.disabled = false;
    }, 1000);

    setTimeout(() => {
      Validation.removeInvalidations(form);
    }, 1000);

    if (invalidInput) {
      Utility.updateButtonStatus(subBtn, "Oops!", true);
      setTimeout(() => {
        Utility.updateButtonStatus(subBtn, "Subscribe");
      }, 1000);
      return;
    }

    Utility.updateButtonStatus(subBtn, "Subscribing... " + loader(), true);
    setTimeout(() => {
      Utility.updateButtonStatus(subBtn, "Subscribed 😀");
    }, 3000);
    setTimeout(() => {
      Utility.updateButtonStatus(subBtn, "Subscribe");
    }, 6000);

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

    const emailDoc = document.getElementById("review-email");
    const firstDoc = document.getElementById("review-first-name");
    const lastDoc = document.getElementById("review-last-name");
    const numDoc = document.getElementById("review-number");
    const revDoc = document.getElementById("review");

    [emailDoc, firstDoc, lastDoc, numDoc, revDoc].forEach((doc) => {
      doc.addEventListener("focus", () => {
        View.showMessage(doc);
        View.removeError(doc);
      });
    });

    [emailDoc, firstDoc, lastDoc, numDoc, revDoc].forEach((doc) => {
      doc.addEventListener("blur", () => {
        View.removeMessage(doc);
      });
    });

    const newsForm = document.getElementById("news-form");

    newsForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputs = Utility.retrieveFormData(e);

      this.handleNewsletterSubscribe(inputs, newsForm);
    });

    handleUnderlineHover();
  },
};
