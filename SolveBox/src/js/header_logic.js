import { checkStatus, signTheUserOut } from "../utility/utility.js";
import { handleUnderlineHover } from "./general_view.js";

export function initHeader() {
  handleDropdownEvents();
  handleShowHeader();
  handleCheckIfSignedIn();
  handleNavBarHover();
  handleMobileHeader();
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

  if (!userInfo) return;
  if (user) {
    userInfo.innerHTML = "";
    const userEmail = document.createElement("p");
    userEmail.classList = "text-gray-400 font-semibold truncate w-[8rem]";
    userEmail.textContent = user.email;

    const signOutBtn = document.createElement("div");
    signOutBtn.classList =
      "bg1 py-1 xl:py-2 px-4 md:px-6 xl:px-10 text-xs md:text-sm xl:text-[1rem] rounded-[2rem] transition-all hover:rounded-none font-semibold cursor-pointer flex-shrink-0";
    signOutBtn.textContent = "Sign Out";
    signOutBtn.setAttribute("data-english", "Sign Out");
    signOutBtn.setAttribute("data-srpski", "Одјавите се");
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
      "py-1 lg:py-2 px-4 lg:px-10 text-xs md:text-sm xl:text-[1rem] relative underline-parent font-semibold flex-shrink-0";
    const text = document.createElement("span");
    text.textContent = "Sign Up";

    text.setAttribute("data-english", "Sign Up");
    text.setAttribute("data-srpski", "Региструјте се");
    signUpBtn.append(text)
    const underline = document.createElement("div");
    underline.classList = "underline-child bg1";
    signUpBtn.append(underline);
    handleUnderlineHover();

    const signInBtn = document.createElement("a");
    signInBtn.setAttribute("href", "./signin.html");
    signInBtn.classList =
      "bg1 py-1 xl:py-2 px-4 md:px-6 xl:px-10 text-xs md:text-sm xl:text-[1rem] rounded-[2rem] transition-all hover:rounded-none font-semibold flex-shrink-0";
    signInBtn.textContent = "Sign In";
    signInBtn.setAttribute("data-english", "Sign In");
    signInBtn.setAttribute("data-srpski", "Пријавите се");

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
        currActive?.lastElementChild.classList.replace(
          "underline-hovered",
          "underline-child"
        );
        currActive?.classList.remove("curr-active");
      });
      b.querySelector(".underline-child")?.classList.add("underline-hovered");
    });

    b.addEventListener("mouseleave", () => {
      currActive?.lastElementChild.classList.replace(
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

export function toggleMobileHeader() {
  const hamburger = document.getElementById("cheeseburger");
  const header = document.getElementById("mobile-header");
  const backdrop = document.getElementById("backdrop");

  backdrop.addEventListener("click", function () {
    backdrop.classList.replace("block", "hidden");
    header.classList.replace("left-[5%]", "left-full");
    hamburger.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M5 5L19 19M5 19L19 5">
            <animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5L19 19M5 19L19 5;M5 5L19 5M5 19L19 19"/>
          </path>
          <path d="M12 12H12" opacity="0">
            <animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M12 12H12;M5 12H19"/>
            <set fill="freeze" attributeName="opacity" begin="0.2s" to="1"/>
          </path>
        </g>
      </svg>`;
  });

  const isOpen = header.classList.contains("left-[5%]");

  if (isOpen) {
    header.classList.replace("left-[5%]", "left-full");
    backdrop.classList.replace("block", "hidden");
    document.body.style.overflow = "";

    hamburger.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M5 5L19 19M5 19L19 5">
            <animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5L19 19M5 19L19 5;M5 5L19 5M5 19L19 19"/>
          </path>
          <path d="M12 12H12" opacity="0">
            <animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M12 12H12;M5 12H19"/>
            <set fill="freeze" attributeName="opacity" begin="0.2s" to="1"/>
          </path>
        </g>
      </svg>`;
  } else {
    header.classList.replace("left-full", "left-[5%]");
    backdrop.classList.replace("hidden", "block");
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "smooth" });

    hamburger.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
          <path d="M5 12H19">
            <animate fill="freeze" attributeName="d" dur="0.4s" values="M5 12H19;M12 12H12"/>
            <set fill="freeze" attributeName="opacity" begin="0.4s" to="0"/>
          </path>
          <path d="M5 5L19 5M5 19L19 19" opacity="0">
            <animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M5 5L19 5M5 19L19 19;M5 5L19 19M5 19L19 5"/>
            <set fill="freeze" attributeName="opacity" begin="0.2s" to="1"/>
          </path>
        </g>
      </svg>`;
  }
}

export function handleMobileHeader() {
  const hamburger = document.getElementById("cheeseburger");
  const header = document.getElementById("mobile-header");
  if (!header) return;

  hamburger.addEventListener("click", toggleMobileHeader);

  header.addEventListener("click", (e) => e.stopPropagation());
}

initHeader();
