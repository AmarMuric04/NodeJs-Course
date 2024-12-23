const storageAccounts = JSON.parse(localStorage.getItem("SolveBox-users"));

export const Model = {
  updatePassword(email, password) {
    storageAccounts.forEach((user) => {
      if (user.email === email) {
        user.password = password;
      }
    });

    localStorage.setItem("SolveBox-users", JSON.stringify(storageAccounts));
  },
};
