import { loader } from "../general_view.js";

export const View = {
  invalidateInput(isValid, element) {
    if (!isValid) {
      element.classList.remove("error-input");
      void element.offsetWidth;
      element.classList.add("error-input");
    }
  },

  highlightElement(input, text, isValid) {
    isValid
      ? text.classList.replace("text-red-400", "text-lime-400")
      : text.classList.replace("text-lime-400", "text-red-400");

    input.classList.toggle("border-[#fa1c9a]", !isValid);
  },

  displayPasswordValidation({ lengthValid, specialCharValid, uppercaseValid }) {
    const pswLength = document.getElementById("password-length-check");
    const pswSpecial = document.getElementById("password-special-check");
    const pswCap = document.getElementById("password-cap-check");
    const pswDoc = document.getElementById("password");

    this.highlightElement(pswDoc, pswLength, lengthValid);
    this.highlightElement(pswDoc, pswSpecial, specialCharValid);
    this.highlightElement(pswDoc, pswCap, uppercaseValid);
  },

  displayConfirmPasswordValidation(isValid) {
    const confirmDoc = document.getElementById("confirm-password");
    const confirmPswCheck = document.getElementById("password-confirm-check");

    this.highlightElement(confirmDoc, confirmPswCheck, isValid);
  },

  updateEmailValidation(isValid) {
    const emailCheck = document.getElementById("email-check");
    const emailDoc = document.getElementById("email");
    this.highlightElement(emailDoc, emailCheck, isValid);
  },

  displaySigninRedirect() {
    const signupParent = document.getElementById("signup-parent");
    const signinElement = document.createElement("a");

    signinElement.classList =
      "transition-all absolute bg-[#fa1c9a] w-full h-full left-0 top-full flex items-center justify-center";
    signinElement.setAttribute("href", "./signin.html");
    signinElement.setAttribute("id", "signin");
    signinElement.textContent = "Let's sign in!";

    const signupBtn = document.getElementById("signup");

    signupParent.appendChild(signinElement);
    signupBtn.textContent = "Signing you up...";
    signupBtn.innerHTML += loader();
    signupBtn.classList.remove("cursor-pointer");
    signupBtn.disabled = true;

    const form = document.getElementById("signup-form");
    const siginBtn = document.getElementById("signin");
    const formBody = document.getElementById("form-body");
    const orSignin = document.getElementById("or-signin");

    setTimeout(() => {
      signupBtn.disabled = false;
      siginBtn.classList.replace("top-full", "top-0");
      formBody.classList.add("opacity-0");
      orSignin.classList.add("opacity-0");
    }, 3000);

    setTimeout(() => {
      form.classList.add("mb-[5rem]");
      signupBtn.remove();
      orSignin.remove();
      formBody.innerHTML = "";
      const title = document.createElement("h1");
      const text = document.createElement("p");

      title.classList = "text-[2.5rem] font-semibold";
      text.classList = "my-8 text-xl text-gray-700";

      title.textContent = "🔓 Access Granted!";
      text.textContent =
        "Welcome to the world of logic, riddles, and solutions. Let’s solve the unsolvable!";
      formBody.prepend(text);
      formBody.prepend(title);
      formBody.classList.replace("opacity-0", "opacity-100");
    }, 3200);
  },
};
