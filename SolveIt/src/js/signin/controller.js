import { Model } from "./model.js";
import { View } from "./view.js";

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
      const checkInputs = Model.correctCredentials(
        inputs.email,
        inputs.password
      );
      if (checkInputs.foundUser) {
        emailDoc.classList.remove("error-input");
        pswDoc.classList.remove("error-input");

        View.displaySignedIn();

        localStorage.setItem(
          "SolveBox-signed-in",
          JSON.stringify(checkInputs.user)
        );

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
    const signInForm = document.getElementById("signin-form");

    signInForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputs = Model.retrieveFormData(e);

      this.handleSignIn(inputs);
    });
  },
};
