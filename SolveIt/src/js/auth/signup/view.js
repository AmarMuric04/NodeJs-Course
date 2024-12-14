export const View = {
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
};
