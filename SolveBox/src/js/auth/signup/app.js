import { checkStatus } from "../../../utility/utility.js";
import { Controller } from "./controller.js";

(() => {
  if (checkStatus()) window.location.href = "./index.html";
})();

document.addEventListener("DOMContentLoaded", () => {
  Controller.init();
});
