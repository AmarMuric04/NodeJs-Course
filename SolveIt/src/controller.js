import { getReviews } from "./model.js";
import { renderReviews } from "./view.js";

const themeBtn = document.querySelector(".theme-js");
const themeCont = document.querySelector(".theme-container-js");

themeBtn.addEventListener("mouseover", () => {
  themeCont.classList.replace("inactive", "active");
});

themeBtn.addEventListener("mouseout", () => {
  themeCont.classList.replace("active", "inactive");
});

export async function init() {
  const reviews = await getReviews();
  renderReviews(reviews);
}
