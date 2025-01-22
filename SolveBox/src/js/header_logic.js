import { checkStatus, signTheUserOut } from "../utility/utility.js";
import { handleUnderlineHover } from "./general_view.js";
let lang = localStorage.getItem("SolveBox-current-language");

window.addEventListener("localStorageChange", (event) => {
  lang = event.newValue;
});

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
  const mobileUserInfo = document.getElementById("mobile-user-info");
  const user = checkStatus();
  {
    /* <li class="flex items-center gap-2 text-sm 2xl:text-lg font-semibold">
 
  <p>Sign in</p>
</li>; */
  }
  if (!userInfo) return;
  if (user) {
    userInfo.innerHTML = "";
    mobileUserInfo.innerHTML = "";
    const userEmail = document.createElement("p");
    userEmail.classList = "font-semibold truncate w-[8rem]";
    userEmail.textContent = user.email;

    const signOutBtn = document.createElement("div");
    signOutBtn.classList =
      "bg1 py-1 xl:py-2 px-4 md:px-6 xl:px-10 text-xs md:text-sm xl:text-[1rem] rounded-[2rem] transition-all hover:rounded-none font-semibold cursor-pointer flex-shrink-0";
    if (lang === "english") signOutBtn.textContent = "Sign Out";
    else signOutBtn.textContent = "Одјавите се";
    signOutBtn.setAttribute("data-english", "Sign Out");
    signOutBtn.setAttribute("data-srpski", "Одјавите се");
    userInfo.append(userEmail);
    userInfo.append(signOutBtn);

    const li = document.createElement("li");
    li.classList = "flex items-center gap-2 text-sm 2xl:text-lg font-semibold";
    li.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 20.75H6a2.64 2.64 0 0 1-2.75-2.53V5.78A2.64 2.64 0 0 1 6 3.25h3a.75.75 0 0 1 0 1.5H6a1.16 1.16 0 0 0-1.25 1v12.47a1.16 1.16 0 0 0 1.25 1h3a.75.75 0 0 1 0 1.5Zm7-4a.74.74 0 0 1-.53-.22a.75.75 0 0 1 0-1.06L18.94 12l-3.47-3.47a.75.75 0 1 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.74.74 0 0 1-.53.22"/><path fill="currentColor" d="M20 12.75H9a.75.75 0 0 1 0-1.5h11a.75.75 0 0 1 0 1.5"/></svg>`;
    const p = document.createElement("p");
    p.textContent = "Sign Out";
    p.setAttribute("data-english", "Sign Out");
    p.setAttribute("data-srpski", "Одјавите се");
    li.append(p);
    mobileUserInfo.append(li);

    [signOutBtn, li].forEach((e) =>
      e.addEventListener("click", () => {
        signTheUserOut();
        handleCheckIfSignedIn();
        handleUnderlineHover();
      })
    );
  } else {
    userInfo.innerHTML = "";
    mobileUserInfo.innerHTML = "";
    const signUpBtn = document.createElement("a");
    signUpBtn.setAttribute("href", "./signup.html");
    signUpBtn.classList =
      "py-1 lg:py-2 px-4 lg:px-10 text-xs md:text-sm xl:text-[1rem] relative underline-parent font-semibold flex-shrink-0";
    const text = document.createElement("span");
    text.textContent = "Sign Up";
    text.setAttribute("data-english", "Sign Up");
    text.setAttribute("data-srpski", "Региструј се");
    signUpBtn.append(text);
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
    signInBtn.setAttribute("data-srpski", "Пријави се");

    userInfo.append(signUpBtn);
    userInfo.append(signInBtn);

    const a1 = document.createElement("a");
    a1.setAttribute("href", "./signin.html");
    const li1 = document.createElement("li");
    li1.classList = "flex items-center gap-2 text-sm 2xl:text-lg font-semibold";
    li1.innerHTML += ` <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M3 3.25c0-.966.784-1.75 1.75-1.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.25.25 0 0 0-.25.25v17.5c0 .138.112.25.25.25h5.5a.75.75 0 0 1 0 1.5h-5.5A1.75 1.75 0 0 1 3 20.75Zm9.994 9.5l3.3 3.484a.75.75 0 0 1-1.088 1.032l-4.5-4.75a.75.75 0 0 1 0-1.032l4.5-4.75a.75.75 0 0 1 1.088 1.032l-3.3 3.484h8.256a.75.75 0 0 1 0 1.5Z"
    />
  </svg>`;
    const p1 = document.createElement("p");
    p1.textContent = lang === "english" ? "Sign in" : "Пријавите се";

    p1.setAttribute("data-english", "Sign in");
    p1.setAttribute("data-srpski", "Пријави се");
    li1.append(p1);
    a1.append(li1);

    const a2 = document.createElement("a");
    a2.setAttribute("href", "./signup.html");
    const li2 = document.createElement("li");
    li2.classList = "flex items-center gap-2 text-sm 2xl:text-lg font-semibold";
    li2.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M15 4a4 4 0 0 0-4 4a4 4 0 0 0 4 4a4 4 0 0 0 4-4a4 4 0 0 0-4-4m0 1.9a2.1 2.1 0 1 1 0 4.2A2.1 2.1 0 0 1 12.9 8A2.1 2.1 0 0 1 15 5.9M4 7v3H1v2h3v3h2v-3h3v-2H6V7zm11 6c-2.67 0-8 1.33-8 4v3h16v-3c0-2.67-5.33-4-8-4m0 1.9c2.97 0 6.1 1.46 6.1 2.1v1.1H8.9V17c0-.64 3.1-2.1 6.1-2.1" />
                </svg>`;
    const p2 = document.createElement("p");
    p2.textContent = lang === "english" ? "Sign up" : "Региструј се";

    p2.setAttribute("data-english", "Sign up");
    p2.setAttribute("data-srpski", "Региструј се");
    li2.append(p2);
    a2.append(li2);
    mobileUserInfo.append(a1);
    mobileUserInfo.append(a2);
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
