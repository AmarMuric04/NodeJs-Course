import { hashPassword } from "../../../utility/utility.js";

export const Model = {
  removeClassOnClick(element, cl) {
    const removeErrorClass = () => {
      element.classList.remove(cl);
      element.removeEventListener("click", removeErrorClass);
    };
    element.addEventListener("click", removeErrorClass);
  },

  async addUser(inputs) {
    const users = JSON.parse(localStorage.getItem("SolveBox-users")) || [];

    const hashedPsw = await hashPassword(inputs.password);

    console.log(hashedPsw);

    users.push({ email: inputs.email, password: hashedPsw });

    localStorage.setItem("SolveBox-users", JSON.stringify(users));
  },
};
