const ACCOUNTS = JSON.parse(localStorage.getItem("SolveBox-users"));

export const Model = {
  correctCredentials(email, password) {
    const user = ACCOUNTS.find(
      (user) => user.email === email && user.password === password
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
