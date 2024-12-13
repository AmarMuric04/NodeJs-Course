import { handleUnderlineHover } from "../../general_view.js";
import { Model } from "./model.js";
import { View } from "./view.js";
import {
  displayAuthFlow,
  displayErrorMessage,
  retrieveFormData,
} from "../auth.js";

export const Controller = {
  handleEmailInput(email) {
    const isValid = Model.isEmailValid(email);
    View.updateEmailValidation(isValid);
  },

  handlePasswordInput(password) {
    const lengthValid = Model.isLongEnough(password);
    const specialCharValid = Model.hasSpecialChar(password);
    const uppercaseValid = Model.hasUppercase(password);

    View.displayPasswordValidation({
      lengthValid,
      specialCharValid,
      uppercaseValid,
    });

    const pswDoc = document.getElementById("password");
    if (password === "") pswDoc.classList.remove("border-[#fa1c9a]");
  },

  handleConfirmPasswordInput(confPsw) {
    const psw = document.getElementById("password").value;

    const isValid = Model.doPasswordsMatch(psw, confPsw);
    View.displayConfirmPasswordValidation(isValid);

    const confPswDoc = document.getElementById("confirm-password");
    if (confPsw === "") confPswDoc.classList.remove("border-[#fa1c9a]");
  },

  handleSignup(inputs) {
    const emailDoc = document.getElementById("email");
    const pswDoc = document.getElementById("password");
    const confPswDoc = document.getElementById("confirm-password");

    let invalidInput = false;

    if (!Model.isPasswordValid(inputs.password)) {
      View.invalidateInput(false, pswDoc);
      Model.removeClassOnClick(pswDoc, "error-input");
      invalidInput = true;
    }
    if (!Model.doPasswordsMatch(inputs.password, inputs["confirm-password"])) {
      View.invalidateInput(false, confPswDoc);
      Model.removeClassOnClick(confPswDoc, "error-input");
      invalidInput = true;
    }
    if (!Model.isEmailValid(inputs.email)) {
      View.invalidateInput(false, emailDoc);
      Model.removeClassOnClick(emailDoc, "error-input");
      invalidInput = true;
    }
    if (Model.userAlreadyExists(inputs.email)) {
      View.invalidateInput(false, emailDoc);
      Model.removeClassOnClick(emailDoc, "error-input");
      displayErrorMessage("Email already taken");
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
