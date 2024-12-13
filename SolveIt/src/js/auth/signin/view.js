export const View = {
  invalidateInput(element) {
    element.classList.remove("error-input");
    void element.offsetWidth;
    element.classList.add("error-input");
  },
};
