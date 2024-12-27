export const Model = {
  removeClassOnClick(element, cl) {
    const removeErrorClass = () => {
      element.classList.remove(cl);
      element.removeEventListener("click", removeErrorClass);
    };
    element.addEventListener("click", removeErrorClass);
  },

  addUser(inputs) {
    const users = JSON.parse(localStorage.getItem("SolveBox-users")) || [];

    users.push({ email: inputs.email, password: inputs.password });

    localStorage.setItem("SolveBox-users", JSON.stringify(users));
  },
};
