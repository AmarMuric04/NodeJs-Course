import { handleUnderlineHover } from "../../general_view.js";
import { Model } from "./model.js";
import * as Validation from "../../../utility/inputs.js";
import * as Utility from "../../../utility/utility.js";
import { correctCredentials, displayAuthFlow } from "../auth.js";

let lang = localStorage.getItem("SolveBox-current-language");

window.addEventListener("localStorageChange", (event) => {
  lang = event.newValue;
});

export const Controller = {
  async handleSignIn(inputs) {
    const emailDoc = document.getElementById("email");
    const pswDoc = document.getElementById("password");

    if (!inputs.email || !inputs.password) {
      if (!inputs.email) {
        Validation.invalidateInput(emailDoc);
        if (lang === "english")
          Validation.displayErrorMessage("Email field can't be empty.");
        else Validation.displayErrorMessage("Имејл поље не сме бити празно.");
      }
      if (!inputs.password) {
        Validation.invalidateInput(pswDoc);
        if (lang === "english")
          Validation.displayErrorMessage("Password field can't be empty.");
        else Validation.displayErrorMessage("Поље шифре не сме бити празно.");
      }
    } else {
      const checkInputs = await correctCredentials(inputs);

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
        if (lang === "english")
          Validation.displayErrorMessage(
            "Invalid email or password. Please try again."
          );
        else
          Validation.displayErrorMessage(
            "Нетачан имејл или шифра. Покушај поново."
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
