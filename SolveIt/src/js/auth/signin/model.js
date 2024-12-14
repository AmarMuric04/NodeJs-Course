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

  updateStatus(user) {
    localStorage.setItem("SolveBox-signed-in", JSON.stringify(user));
  },
};
