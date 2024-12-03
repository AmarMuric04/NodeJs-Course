export const Model = {
  isLongEnough(input) {
    return input.length >= 6;
  },

  hasSpecialChar(input) {
    return /[!@#$%^&*(),.?":{}|<>]/.test(input);
  },

  hasUppercase(input) {
    return /[A-Z]/.test(input);
  },

  isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  doPasswordsMatch(password, confirmPsw) {
    return password === confirmPsw && confirmPsw !== "";
  },

  isPasswordValid(password) {
    return (
      this.isLongEnough(password) &&
      this.hasSpecialChar(password) &&
      this.hasUppercase(password)
    );
  },

  retrieveFormData(event) {
    const form = event.target;
    const formData = new FormData(form);

    const data = {};

    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }
    return data;
  },

  removeClassOnClick(element, cl) {
    const removeErrorClass = () => {
      element.classList.remove(cl);
      element.removeEventListener("click", removeErrorClass);
    };
    element.addEventListener("click", removeErrorClass);
  },
};
