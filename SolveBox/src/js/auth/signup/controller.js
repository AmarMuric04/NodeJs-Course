import { handleUnderlineHover } from "../../general_view.js";
import { Model } from "./model.js";
import { View } from "./view.js";
import { displayAuthFlow, findJSONUser, findStorageUser } from "../auth.js";
import * as Validation from "../../../utility/inputs.js";
import { retrieveFormData } from "../../../utility/utility.js";

let lang = localStorage.getItem("SolveBox-current-language");

window.addEventListener("localStorageChange", (event) => {
  lang = event.newValue;
});

export const Controller = {
  handleEmailInput(email) {
    const isValid = Validation.isEmailValid(email);
    View.updateEmailValidation(isValid);
  },

  handlePasswordInput(password) {
    const lengthValid = Validation.isLongEnough(password);
    const specialCharValid = Validation.hasSpecialChar(password);
    const uppercaseValid = Validation.hasUppercase(password);

    View.displayPasswordValidation({
      lengthValid,
      specialCharValid,
      uppercaseValid,
    });

    const pswDoc = document.getElementById("password");
    if (Validation.isInputEmpty(pswDoc))
      pswDoc.classList.remove("border-[#fa1c9a]");
  },

  handleConfirmPasswordInput(confPsw) {
    const psw = document.getElementById("password").value;

    const isValid = Validation.doPasswordsMatch(psw, confPsw);
    View.displayConfirmPasswordValidation(isValid);

    const confPswDoc = document.getElementById("confirm-password");
    if (Validation.isInputEmpty(confPsw))
      confPswDoc.classList.remove("border-[#fa1c9a]");
  },

  async handleSignup(inputs) {
    const emailDoc = document.getElementById("email");
    const pswDoc = document.getElementById("password");
    const confPswDoc = document.getElementById("confirm-password");

    let invalidInput = false;

    if (!Validation.isPasswordValid(inputs.password)) {
      Validation.invalidateInput(pswDoc);
      Model.removeClassOnClick(pswDoc, "error-input");
      invalidInput = true;
    }
    if (
      !Validation.doPasswordsMatch(inputs.password, inputs["confirm-password"])
    ) {
      Validation.invalidateInput(confPswDoc);
      Model.removeClassOnClick(confPswDoc, "error-input");
      invalidInput = true;
    }
    if (!Validation.isEmailValid(inputs.email)) {
      Validation.invalidateInput(emailDoc);
      Model.removeClassOnClick(emailDoc, "error-input");
      invalidInput = true;
    }
    if (findStorageUser(inputs.email)) {
      Validation.invalidateInput(emailDoc);
      Model.removeClassOnClick(emailDoc, "error-input");
      if (lang === "english")
        Validation.displayErrorMessage("Email already taken");
      else Validation.displayErrorMessage("Имејл већ заузет");

      invalidInput = true;
    }
    const JSONUser = await findJSONUser(inputs.email);
    if (JSONUser) {
      Validation.invalidateInput(emailDoc);
      Model.removeClassOnClick(emailDoc, "error-input");
      if (lang === "english")
        Validation.displayErrorMessage(
          "JSON account. Password: " + JSONUser.password
        );
      else
        Validation.displayErrorMessage(
          "ЈСОН профил. Лозинка: " + JSONUser.password
        );
      invalidInput = true;
    }
    if (invalidInput) return;

    Model.addUser(inputs);
    displayAuthFlow(false);
  },

  init() {
    handleUnderlineHover();

    const emailDoc = document.getElementById("email");
    const pswDoc = document.getElementById("password");
    const confPswDoc = document.getElementById("confirm-password");
    const signupForm = document.getElementById("signup-form");

    emailDoc.addEventListener("input", () => {
      const email = emailDoc.value;
      this.handleEmailInput(email);
    });

    pswDoc.addEventListener("input", () => {
      const psw = pswDoc.value;
      this.handlePasswordInput(psw);

      const confPsw = confPswDoc.value;
      this.handleConfirmPasswordInput(confPsw);
    });

    confPswDoc.addEventListener("input", () => {
      const confPsw = confPswDoc.value;
      this.handleConfirmPasswordInput(confPsw);
    });

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = retrieveFormData(e);
      this.handleSignup(inputs);
    });
  },
};
