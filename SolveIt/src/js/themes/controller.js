import { View } from "./view.js";
import { Model } from "./model.js";

export const Controller = {
  handleChangeTheme(theme) {
    View.changeTheme(theme);
  },

  handleSaveTheme() {
    const savedTheme = localStorage.getItem("theme") || "dark-theme";
    document.body.classList.add(savedTheme.replaceAll('"', ""));
  },

  init() {
    this.handleSaveTheme();
    const themeBtns = document.querySelectorAll(".theme-btn");

    themeBtns.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.handleChangeTheme(Model[e.target.dataset.theme]);
      });
    });
  },
};
