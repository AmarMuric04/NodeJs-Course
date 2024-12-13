import { initializeHeader } from "../header_logic.js";
import { handleNavBarHover, handleUnderlineHover } from "../general_view.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeHeader();
  handleUnderlineHover();
  handleNavBarHover();
});
