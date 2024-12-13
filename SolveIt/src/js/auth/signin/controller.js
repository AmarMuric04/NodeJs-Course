import { handleUnderlineHover } from "../../general_view.js";
import { Model } from "./model.js";
import { View } from "./view.js";
import { checkStatus, displayAuthFlow, retrieveFormData } from "../auth.js";

export const Controller = {
  handleSignIn(inputs) {
    const emailDoc = document.getElementById("email");
    const pswDoc = document.getElementById("password");

    if (!inputs.email || !inputs.password) {
      if (!inputs.email) {
        View.invalidateInput(emailDoc);
        View.displayErrorMessage("Email field can't be empty.");
      }
      if (!inputs.password) {
        View.invalidateInput(pswDoc);
        View.displayErrorMessage("Password field can't be empty.");
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
        View.invalidateInput(emailDoc);
        View.invalidateInput(pswDoc);
        View.displayErrorMessage(
          "Invalid email or password. Please try again."
        );
      }
    }

    Model.removeClassOnClick(emailDoc, "error-input");
    Model.removeClassOnClick(pswDoc, "error-input");
  },

  init() {
    if (checkStatus()) window.href = "./home";
    handleUnderlineHover();

    const signInForm = document.getElementById("signin-form");

    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = retrieveFormData(e);

      this.handleSignIn(inputs);
    });
  },
};
