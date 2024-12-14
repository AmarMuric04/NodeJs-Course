import { handleUnderlineHover } from "../../general_view.js";
import { Model } from "./model.js";
import * as Validation from "../../../utility/inputs.js";
import * as Utility from "../../../utility/utility.js";
import { displayAuthFlow } from "../auth.js";

export const Controller = {
  handleSignIn(inputs) {
    const emailDoc = document.getElementById("email");
    const pswDoc = document.getElementById("password");

    if (!inputs.email || !inputs.password) {
      if (!inputs.email) {
        Validation.invalidateInput(emailDoc);
        Validation.displayErrorMessage("Email field can't be empty.");
      }
      if (!inputs.password) {
        Validation.invalidateInput(pswDoc);
        Validation.displayErrorMessage("Password field can't be empty.");
      }
    } else {
      const checkInputs = Model.correctCredentials(inputs);

      if (checkInputs.foundUser) {
        emailDoc.classList.remove("error-input");
        pswDoc.classList.remove("error-input");

        displayAuthFlow(true);
        Model.updateStatus(checkInputs.user);

        setTimeout(() => {
          window.location.href = "./index.html";
        }, 6200);
      } else {
        Validation.invalidateInput(emailDoc);
        Validation.invalidateInput(pswDoc);
        Validation.displayErrorMessage(
          "Invalid email or password. Please try again."
        );
      }
    }

    Utility.removeClassOnClick(emailDoc, "error-input");
    Utility.removeClassOnClick(pswDoc, "error-input");
  },

  init() {
    handleUnderlineHover();

    const signInForm = document.getElementById("signin-form");

    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = Utility.retrieveFormData(e);

      this.handleSignIn(inputs);
    });
  },
};
