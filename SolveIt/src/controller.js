import { getReviews } from "./model.js";
import { renderReviews } from "./view.js";

export async function handleThemes() {
  const themeBtn = document.querySelector(".theme-js");
  const themeCont = document.querySelector(".theme-container-js");

  themeBtn.addEventListener("mouseover", () => {
    themeCont.classList.replace("inactive", "active");
  });

  themeBtn.addEventListener("mouseout", () => {
    themeCont.classList.replace("active", "inactive");
  });
}

export async function handleReviews() {
  const reviews = await getReviews();
  renderReviews(reviews);

  const reviewsParent = document.querySelector(".reviews");

  const prevButton = document.querySelector(".prev-button");
  const nextButton = document.querySelector(".next-button");

  const scrollAmount = reviewsParent.firstElementChild.offsetWidth;

  let index = 0;

  function disableButton(button) {
    button.disabled = true;

    setTimeout(() => {
      button.disabled = false;
    }, 600);
  }

  nextButton.addEventListener("click", function () {
    if (index === reviews.length - 1) {
      reviewsParent.append(reviewsParent.firstElementChild);
    } else {
      index++;
    }
    reviewsParent.scrollTo({
      left: reviewsParent.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
    disableButton(this);
  });

  prevButton.addEventListener("click", function () {
    if (index === 0) {
      reviewsParent.prepend(reviewsParent.lastElementChild);
    } else {
      index--;
    }
    reviewsParent.scrollTo({
      left: reviewsParent.scrollLeft - scrollAmount,
      behavior: "smooth",
    });
    disableButton(this);
  });
}

export async function handleDrop() {
  const dropdowns = document.querySelectorAll(".drop");

  dropdowns.forEach((drop) => {
    drop.addEventListener("click", function () {
      if (this.classList.contains("drop-enabled")) {
        this.classList.replace("drop-enabled", "drop-disabled");
        return;
      }
      dropdowns.forEach((drop) => {
        drop.classList.replace("drop-enabled", "drop-disabled");
      });

      this.classList.replace("drop-disabled", "drop-enabled");
    });
  });
}

export async function handleSignUp() {
  const signupParent = document.querySelector(".signup-parent");

  signupParent.addEventListener("mouseenter", function () {
    this.querySelector(".signup").classList.add("signup-hovered");
  });

  signupParent.addEventListener("mouseleave", function () {
    this.querySelector(".signup").classList.remove("signup-hovered");
  });
}
