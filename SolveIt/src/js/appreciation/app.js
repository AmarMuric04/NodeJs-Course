import { handleUnderlineHover } from "../general_view.js";

document.addEventListener("DOMContentLoaded", () => {
  const session = JSON.parse(localStorage.getItem("SolveBox-review-session"));

  if (!session) window.location.href = "./index.html";

  setTimeout(() => {
    localStorage.removeItem("SolveBox-review-session");
  }, 10);

  handleUnderlineHover();

  const nameDoc = document.getElementById("name");
  const professionDoc = document.getElementById("profession");
  const descDoc = document.getElementById("description");

  nameDoc.textContent = session["review-first-name"]
    .concat(" ")
    .concat(session["review-last-name"]);
  professionDoc.textContent = "Absolute genius";
  descDoc.textContent = session["review"];
});
