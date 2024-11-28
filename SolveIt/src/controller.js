export function handleThemeHoverIn() {
  const themeCont = document.querySelector(".theme-container-js");
  themeCont.classList.replace("inactive", "active");
}

export function handleThemeHoverOut() {
  const themeCont = document.querySelector(".theme-container-js");
  themeCont.classList.replace("active", "inactive");
}

export function handleNextReview(reviewsParent, scrollAmount) {
  reviewsParent.append(reviewsParent.firstElementChild);
  reviewsParent.scrollTo({
    left: reviewsParent.scrollLeft + scrollAmount,
    behavior: "smooth",
  });
}

export function handlePrevReview(reviewsParent, scrollAmount) {
  reviewsParent.prepend(reviewsParent.lastElementChild);
  reviewsParent.scrollTo({
    left: reviewsParent.scrollLeft - scrollAmount,
    behavior: "smooth",
  });
}

export function handleDropdownClick(drop, dropdowns) {
  if (drop.classList.contains("drop-enabled")) {
    drop.classList.replace("drop-enabled", "drop-disabled");
    return;
  }
  dropdowns.forEach((d) =>
    d.classList.replace("drop-enabled", "drop-disabled")
  );
  drop.classList.replace("drop-disabled", "drop-enabled");
}

export function handleNavHoverIn(navParent) {
  navParent.querySelector(".nav").classList.add("nav-hovered");
}

export function handleNavHoverOut(navParent) {
  navParent.querySelector(".nav").classList.remove("nav-hovered");
}
