const storageAccounts = JSON.parse(localStorage.getItem("SolveBox-users"));

export const Model = {
  updateStatus(user) {
    localStorage.setItem("SolveBox-signed-in", JSON.stringify(user));
  },
};
