import * as Validation from "../../../utility/inputs.js";
import * as Utility from "../../../utility/utility.js";
import { retrieveFormData } from "../../../utility/utility.js";
import { handleUnderlineHover } from "../../general_view.js";
import { doesAccountExist } from "../auth.js";
import { View } from "./view.js";

export const Controller = {
  currentStep: 0,
  code: null,

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
    const accountExists = await doesAccountExist(inputs.email);
    if (!accountExists) {
      Validation.invalidateInput(emailDoc);
      Validation.displayErrorMessage(
        "Account with given email does not exist!"
      );
      return;
    }
    (this.code = String((Math.random() * (999999 - 0) + 0).toFixed(0)).padStart(
      6,
      "0"
    )),
      alert(
        "Since this is just a frontend only project, this is the code: " +
          this.code +
          "           (Copy it so you don't forget)"
      );
    View.displayGetCode();

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

    this.currentStep++;
  },

  handleSecondSubmition(e) {
    const inputs = retrieveFormData(e);
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

  handleThirdSubmition(e) {
    const inputs = retrieveFormData(e);
    console.log(inputs);
    View.displayCongratulations();
    this.currentStep++;
  },

  handleFormSubmission(e) {
    e.preventDefault();

    if (this.currentStep === 0) {
      this.handleFirstSubmition(e);
    } else if (this.currentStep === 1) {
      this.handleSecondSubmition(e);
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
