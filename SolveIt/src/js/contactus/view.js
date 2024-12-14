import { loader } from "../general_view.js";

export const View = {
  updateButtonStatus(button) {
    button.innerHTML = "Submitting..." + loader();
  },
};
