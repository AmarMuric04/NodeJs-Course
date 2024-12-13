import { checkStatus, signTheUserOut } from "../utility/utility.js";
import { handleUnderlineHover } from "./general_view.js";

export function initHeader() {
  handleDropdownEvents();
  handleShowHeader();
  handleCheckIfSignedIn();
  handleNavBarHover();
}

function handleDropdownEvents() {
  const dropdowns = document.querySelectorAll(".drop");
  dropdowns.forEach((drop) => {
    drop.addEventListener("click", () => {
      if (drop.classList.contains("drop-enabled")) {
        drop.classList.replace("drop-enabled", "drop-disabled");
      } else {
        dropdowns.forEach((d) =>
          d.classList.replace("drop-enabled", "drop-disabled")
        );
        drop.classList.replace("drop-disabled", "drop-enabled");
      }
    });
  });
}

function handleShowHeader() {
  const header = document.querySelector("header");
  const headerHeight = header.offsetHeight;
  window.addEventListener("scroll", () => {
    if (window.scrollY >= headerHeight) {
      header.classList.add("header-scrolled");
      header.classList.add("shadow-md");
    } else {
      header.classList.remove("header-scrolled");
      header.classList.remove("shadow-md");
    }
  });
}

function handleCheckIfSignedIn() {
  const userInfo = document.getElementById("user-information");
  const user = checkStatus();

  if (user) {
    userInfo.innerHTML = "";
    const userEmail = document.createElement("p");
    userEmail.classList = "text-gray-400 font-semibold truncate w-[8rem]";
    userEmail.textContent = user.email;

    const signOutBtn = document.createElement("div");
    signOutBtn.classList =
      "bg1 py-1 xl:py-2 px-4 md:px-6 xl:px-10 text-xs md:text-sm xl:text-[1rem] rounded-[2rem] transition-all hover:rounded-none font-semibold";
    signOutBtn.textContent = "Sign Out";
    signOutBtn.addEventListener("click", () => {
      signTheUserOut();
      handleCheckIfSignedIn();
      handleUnderlineHover();
    });
    userInfo.append(userEmail);
    userInfo.append(signOutBtn);
  } else {
    userInfo.innerHTML = "";
    const signUpBtn = document.createElement("a");
    signUpBtn.setAttribute("href", "./signup.html");
    signUpBtn.classList =
      "py-1 lg:py-2 px-4 lg:px-10 text-xs md:text-sm xl:text-[1rem] relative underline-parent font-semibold";
    signUpBtn.textContent = "Sign Up";
    const underline = document.createElement("div");
    underline.classList = "underline-child bg1";
    signUpBtn.append(underline);
    handleUnderlineHover();

    const signInBtn = document.createElement("a");
    signInBtn.setAttribute("href", "./signin.html");
    signInBtn.classList =
      "bg1 py-1 xl:py-2 px-4 md:px-6 xl:px-10 text-xs md:text-sm xl:text-[1rem] rounded-[2rem] transition-all hover:rounded-none font-semibold";
    signInBtn.textContent = "Sign In";

    userInfo.append(signUpBtn);
    userInfo.append(signInBtn);
  }
}

export function handleNavBarHover() {
  const btns = document.querySelectorAll(".navbar-text");
  const currActive = document.querySelector(".curr-active");
  btns.forEach((b) => {
    b.addEventListener("mouseenter", () => {
      if (b === currActive) return;
      btns.forEach(() => {
        currActive?.firstElementChild.classList.replace(
          "underline-hovered",
          "underline-child"
        );
        currActive?.classList.remove("curr-active");
      });
      b.querySelector(".underline-child")?.classList.add("underline-hovered");
    });

    b.addEventListener("mouseleave", () => {
      currActive?.firstElementChild.classList.replace(
        "underline-child",
        "underline-hovered"
      );
      currActive?.classList.add("curr-active");
      b.querySelector(".underline-child")?.classList.remove(
        "underline-hovered"
      );
    });
  });
}

initHeader();
