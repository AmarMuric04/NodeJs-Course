const storageAccounts = JSON.parse(localStorage.getItem("SolveBox-users"));

export const Model = {
  async correctCredentials(inputs) {
    try {
      const accountsResponse = await fetch("../assets/accounts.json");

      const jsonAccounts = await accountsResponse.json();
      const users = [...jsonAccounts, ...storageAccounts];

      const user = users.find(
        (user) =>
          user.email === inputs.email && user.password === inputs.password
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
    } catch (error) {
      console.error(error);
    }
  },

  updateStatus(user) {
    localStorage.setItem("SolveBox-signed-in", JSON.stringify(user));
  },
};
