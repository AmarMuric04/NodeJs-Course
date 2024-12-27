import * as Validation from "../../../utility/inputs.js";
import { retrieveFormData } from "../../../utility/utility.js";
import { handleUnderlineHover } from "../../general_view.js";
import { findAccount, findJSONUser, findStorageUser } from "../auth.js";
import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = {
  currentStep: 0,
  code: null,
  email: "",

  async handleFirstSubmition(e) {
    const inputs = retrieveFormData(e);
    const emailDoc = document.getElementById("email");
    const form = document.getElementById("forgot-password-form");

    setTimeout(() => {
      Validation.removeInvalidations(form);
    }, 1000);

    if (!Validation.isEmailValid(inputs.email)) {
      Validation.invalidateInput(emailDoc);
      Validation.displayErrorMessage(
        "Invalid email address! Please try again!"
      );
      return;
    }
    const accountIsJSON = await findJSONUser(inputs.email);
    if (accountIsJSON) {
      Validation.invalidateInput(emailDoc);
      Validation.displayErrorMessage(
        "Please use one of the accounts you've created!"
      );
      return;
    }
    const accountExists = findStorageUser(inputs.email);
    if (!accountExists) {
      Validation.invalidateInput(emailDoc);
      Validation.displayErrorMessage(
        "Account with given email does not exist!"
      );
      return;
    }

    this.email = inputs.email;

    this.code = String((Math.random() * (999999 - 0) + 0).toFixed(0)).padStart(
      6,
      "0"
    );
    View.displayGetCode();
    setTimeout(() => {
      alert(
        "Since this is just a frontend only project, this is the code: " +
          this.code +
          "           (Copy it so you don't forget)"
      );
      const inputFields = document.querySelectorAll("form input");
      inputFields.forEach((input, index) => {
        input.addEventListener("input", () => {
          const value = input.value;

          if (value.length > 1) {
            for (let i = 0; i < value.length; i++) {
              const targetInput = inputFields[index + i];
              if (targetInput) {
                targetInput.value = value[i];
              }
            }

            input.value = value[0];

            const nextInput = inputFields[index + value.length];
            if (nextInput) {
              nextInput.focus();
            }
          } else if (value !== "") {
            const nextInput = inputFields[index + 1];
            if (nextInput) {
              nextInput.focus();
            }
          }
        });
      });
    }, 310);

    this.currentStep++;
  },

  handleSecondSubmition() {
    const inputFields = document.querySelectorAll("form input");
    let usersCode = "";

    const form = document.getElementById("forgot-password-form");

    setTimeout(() => {
      Validation.removeInvalidations(form);
    }, 1000);

    let error = false;

    for (let i = 0; i < inputFields.length; i++) {
      const currInput = document.querySelector("[name=number" + i + "]");
      if (Validation.isInputEmpty(inputFields[i].value)) {
        Validation.displayErrorMessage("Please fill out every field!");
        Validation.invalidateInput(currInput);
        error = true;
      } else usersCode += inputFields[i].value;
    }

    if (error) return;

    if (usersCode !== this.code) {
      for (let i = 0; i < inputFields.length; i++) {
        const currInput = document.querySelector("[name=number" + i + "]");
        Validation.displayErrorMessage("Invalid code! Try again!");
        Validation.invalidateInput(currInput);
      }

      error = true;
    }

    if (error) return;

    View.displayResetPassword();
    this.currentStep++;
  },

  async handleThirdSubmition(e) {
    const inputs = retrieveFormData(e);
    const pswDoc = document.getElementById("password");
    const confPswDoc = document.getElementById("conf-password");
    const form = document.getElementById("forgot-password-form");

    setTimeout(() => {
      Validation.removeInvalidations(form);
    }, 1000);

    if (
      !Validation.doPasswordsMatch(
        inputs["new-password"],
        inputs["conf-password"]
      )
    ) {
      Validation.invalidateInput(pswDoc);
      Validation.invalidateInput(confPswDoc);
      Validation.displayErrorMessage("Passwords must match!");
      return;
    }

    /* With this logic we can give the user his password, but why do that? */
    const usersAccount = await findAccount(this.email);

    if (inputs["new-password"] === usersAccount.password) {
      Validation.invalidateInput(pswDoc);
      Validation.invalidateInput(confPswDoc);
      Validation.displayErrorMessage(
        "Please don't use one of your previous passwords."
      );
      return;
    }

    Model.updatePassword(this.email, inputs["new-password"]);
    View.displayCongratulations();
    this.currentStep++;
  },

  handleFormSubmission(e) {
    e.preventDefault();

    if (this.currentStep === 0) {
      this.handleFirstSubmition(e);
    } else if (this.currentStep === 1) {
      this.handleSecondSubmition();
    } else if (this.currentStep === 2) {
      this.handleThirdSubmition(e);
    }
  },

  init() {
    handleUnderlineHover();
    const form = document.getElementById("forgot-password-form");

    form.addEventListener("submit", this.handleFormSubmission.bind(this));
  },
};
