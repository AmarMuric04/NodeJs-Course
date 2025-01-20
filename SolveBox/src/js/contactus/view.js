export const View = {
  showMessage(doc) {
    doc.nextElementSibling.nextElementSibling.classList.replace(
      "opacity-0",
      "opacity-100"
    );
  },

  removeMessage(doc) {
    doc.nextElementSibling.nextElementSibling.classList.replace(
      "opacity-100",
      "opacity-0"
    );
  },

  showError(doc, errorMsg, errorMsgSr) {
    doc.nextElementSibling.classList.replace("opacity-0", "opacity-100");
    doc.nextElementSibling.querySelector("span").textContent = errorMsg;
    doc.nextElementSibling
      .querySelector("span")
      .setAttribute("data-english", errorMsg);
    doc.nextElementSibling
      .querySelector("span")
      .setAttribute("data-srpski", errorMsgSr);
  },

  removeError(doc) {
    doc.nextElementSibling.classList.replace("opacity-100", "opacity-0");
  },
};
