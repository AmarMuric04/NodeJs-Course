export const View = {
  changeTheme(theme) {
    document.body.className = theme;
    localStorage.setItem("theme", JSON.stringify(theme));
  },
};
