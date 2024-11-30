export function handleNextReview(reviewsParent, scrollAmount, scrollIndex) {
  if (scrollIndex % 5 == 0)
    reviewsParent.append(reviewsParent.firstElementChild);
  reviewsParent.scrollTo({
    left: reviewsParent.scrollLeft + scrollAmount,
    behavior: "smooth",
  });
}

export function handlePrevReview(reviewsParent, scrollAmount, scrollIndex) {
  if (scrollIndex % 5 == 0)
    reviewsParent.prepend(reviewsParent.lastElementChild);
  reviewsParent.scrollTo({
    left: reviewsParent.scrollLeft - scrollAmount,
    behavior: "smooth",
  });
}
