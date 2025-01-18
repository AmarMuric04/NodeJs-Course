export const View = {
  highlightElement(input, text, isValid) {
    isValid
      ? text.classList.replace("text-red-400", "text-lime-400")
      : text.classList.replace("text-lime-400", "text-red-400");

    if (text.firstElementChild) {
      text.firstElementChild.remove();
    }

    const newIcon = document.createElement("div");
    newIcon.innerHTML = isValid
      ? `<svg class="ml-1 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 12 12"><path fill="currentColor" d="M9.854 3.146a.5.5 0 0 1 0 .708l-4.5 4.5a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L5 7.293l4.146-4.147a.5.5 0 0 1 .708 0"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-4 h-4 2xl:w-8 2xl:h-8">
           <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5"
             d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07" />
         </svg>`;

    text.prepend(newIcon.firstChild);

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
};
