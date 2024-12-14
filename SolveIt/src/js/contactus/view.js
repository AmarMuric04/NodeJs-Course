import { loader } from "../general_view.js";
import * as Utility from "../../utility/utility.js";

export const View = {
  updateButtonSubmit(button) {
    button.innerHTML = "Submitting..." + loader();
  },

  updateButtonStatus(button) {
    button.innerHTML = "Subscribing..." + loader();
    Utility.disableButton(button);

    setTimeout(() => {
      button.innerHTML = "Subscribed " + "😀";
    }, 3000);

    setTimeout(() => {
      button.innerHTML = "Subscribe";
      button.disabled = false;
    }, 6000);
  },
};
