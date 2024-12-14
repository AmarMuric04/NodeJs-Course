import { handleNavBarHover, handleUnderlineHover } from "../general_view.js";
import { initializeHeader } from "../header_logic.js";

document.addEventListener("DOMContentLoaded", () => {
  const session = JSON.parse(localStorage.getItem("SolveBox-review-session"));

  setTimeout(() => {
    localStorage.removeItem("SolveBox-review-session");
  }, 10);

  initializeHeader();
  handleNavBarHover();
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
