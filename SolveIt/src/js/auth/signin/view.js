export const View = {
  invalidateInput(element) {
    element.classList.remove("error-input");
    void element.offsetWidth;
    element.classList.add("error-input");
  },

  displayErrorMessage(error) {
    const errorVisible = document.getElementById("error-parent");
    if (errorVisible) errorVisible.remove();

    const errorParent = document.createElement("div");
    errorParent.classList =
      "absolute w-full transition-all opacity-0 top-16 flex flex-col text-sm my-4 bg-[#242234] rounded-xl p-4 font-semibold text-center";
    errorParent.setAttribute("id", "error-parent");

    const errorMessage = document.createElement("p");
    errorMessage.classList = "flex items-center text-red-400";
    errorMessage.setAttribute("id", "email-check");
    errorMessage.textContent = error;

    errorParent.appendChild(errorMessage);

    const formBody = document.getElementById("form-body");
    formBody.prepend(errorParent);

    setTimeout(() => {
      errorParent.classList.replace("opacity-0", "opacity-100");
    }, 10);
    setTimeout(() => {
      errorParent.classList.replace("opacity-100", "opacity-0");
    }, 1500);
    setTimeout(() => {
      errorParent.remove();
    }, 1700);
  },
};
