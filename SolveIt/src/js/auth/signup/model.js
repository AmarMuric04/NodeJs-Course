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

  removeClassOnClick(element, cl) {
    const removeErrorClass = () => {
      element.classList.remove(cl);
      element.removeEventListener("click", removeErrorClass);
    };
    element.addEventListener("click", removeErrorClass);
  },

  userAlreadyExists(email) {
    const users = JSON.parse(localStorage.getItem("SolveBox-users")) || [];
    return users.some((user) => user.email === email);
  },

  addUser(inputs) {
    const users = JSON.parse(localStorage.getItem("SolveBox-users")) || [];

    users.push({ email: inputs.email, password: inputs.password });

    localStorage.setItem("SolveBox-users", JSON.stringify(users));
  },
};
