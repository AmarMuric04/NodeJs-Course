import { isEmail } from "../../utility/inputs.js";
import { Model } from "./model.js";
import { View } from "./view.js";

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
    pswDoc.classList.toggle(
      "border-red-400",
      !(lengthValid && specialCharValid && uppercaseValid)
    );
  },

  handleConfirmPasswordInput(password) {
    const psw = document.getElementById("password").value;

    const isValid = Model.doPasswordsMatch(password, psw);
    View.displayConfirmPasswordValidation(isValid);
  },

  handleSignup(email, password, confirmPsw) {},

  init() {
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
    });

    confPswDoc.addEventListener("input", () => {
      const confPsw = confPswDoc.value;
      this.handleConfirmPasswordInput(confPsw);
    });

    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const inputs = Model.retrieveFormData(e);

      if (
        !Model.isPasswordValid(inputs.password) ||
        !Model.doPasswordsMatch(inputs.password, inputs["confirm-password"]) ||
        !Model.isEmailValid(inputs.email)
      ) {
        console.log("Nope!");
        return;
      }

      View.displaySigninRedirect();

      console.log("submitted");
    });
  },
};
