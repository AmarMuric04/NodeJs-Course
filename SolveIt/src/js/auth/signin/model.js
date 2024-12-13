const ACCOUNTS = JSON.parse(localStorage.getItem("SolveBox-users"));

export const Model = {
  correctCredentials(inputs) {
    const user = ACCOUNTS.find(
      (user) => user.email === inputs.email && user.password === inputs.password
    );

    if (user) {
      return {
        user,
        foundUser: true,
      };
    }

    return {
      user: null,
      foundUser: false,
    };
  },

  removeClassOnClick(element, cl) {
    const removeErrorClass = () => {
      element.classList.remove(cl);
      element.removeEventListener("click", removeErrorClass);
    };
    element.addEventListener("click", removeErrorClass);
  },

  updateStatus(user) {
    localStorage.setItem("SolveBox-signed-in", JSON.stringify(user));
  },
};
