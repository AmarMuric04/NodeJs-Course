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

  handleThemeEvents() {
    const themeBtn = document.querySelector(".theme-js");
    const themeCont = document.querySelector(".theme-container-js");

    themeBtn?.addEventListener("mouseover", () => {
      themeCont?.classList.replace("inactive", "active");
    });

    themeBtn?.addEventListener("mouseout", () => {
      themeCont?.classList.replace("active", "inactive");
    });
  },

  init() {
    this.handleThemeEvents();
    this.handleSaveTheme();
    const themeBtns = document.querySelectorAll(".theme-btn");

    themeBtns.forEach((element) => {
      element.addEventListener("click", (e) => {
        this.handleChangeTheme(Model[e.target.dataset.theme]);
      });
    });
  },
};
