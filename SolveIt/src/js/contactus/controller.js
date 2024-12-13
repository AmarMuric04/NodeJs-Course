import { initializeHeader } from "../header_logic.js";
import { handleNavBarHover, handleUnderlineHover } from "../general_view.js";

export const Controller = {
  init() {
    initializeHeader();
    handleUnderlineHover();
    handleNavBarHover();
  },
};
