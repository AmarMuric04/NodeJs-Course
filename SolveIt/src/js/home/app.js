import { Controller } from "./controller.js";

localStorage.setItem("yourKey", "newValue");
document.addEventListener("DOMContentLoaded", () => {
  Controller.init();
});
