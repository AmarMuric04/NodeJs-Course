import { loader } from "../general_view.js";

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

  displaySignedIn() {
    const signinParent = document.getElementById("signup-parent");
    const signedInElement = document.createElement("a");

    signedInElement.classList =
      "transition-all absolute bg-[#fa1c9a] w-full h-full left-0 top-full flex items-center justify-center";
    signedInElement.setAttribute("href", "./index.html");
    signedInElement.setAttribute("id", "signup");
    signedInElement.textContent = "Home Page";

    const signinBtn = document.getElementById("signin");

    signinParent.appendChild(signedInElement);
    signinBtn.textContent = "Signing you in...";
    signinBtn.innerHTML += loader();
    signinBtn.classList.remove("cursor-pointer");
    signinBtn.disabled = true;

    const form = document.getElementById("signin-form");
    const signupBtn = document.getElementById("signup");
    const formBody = document.getElementById("form-body");
    const orSignup = document.getElementById("or-signup");

    setTimeout(() => {
      signinBtn.disabled = false;
      signupBtn.classList.replace("top-full", "top-0");
      formBody.classList.add("opacity-0");
      orSignup.classList.add("opacity-0");
    }, 3000);

    setTimeout(() => {
      form.classList.add("mb-[5rem]");
      signinBtn.remove();
      orSignup.remove();
      formBody.innerHTML = "";
      const title = document.createElement("h1");
      const text = document.createElement("p");

      title.classList = "text-[2rem] font-semibold";
      text.classList = "my-8 text-xl text-gray-700";

      title.textContent = "🎉 Welcome Back, Puzzle Master!";
      text.textContent =
        "Ready to tackle more brain-busting challenges? Let’s dive in and solve the unsolvable!";
      formBody.prepend(text);
      formBody.prepend(title);
      formBody.classList.replace("opacity-0", "opacity-100");
    }, 3200);
  },
};
