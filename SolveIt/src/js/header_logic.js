export function initializeHeader() {
  handleThemeEvents();
  handleNavHoverEvents();
  handleDropdownEvents();
  handleShowHeader();
}

function handleThemeEvents() {
  const themeBtn = document.querySelector(".theme-js");
  const themeCont = document.querySelector(".theme-container-js");

  themeBtn?.addEventListener("mouseover", () => {
    themeCont?.classList.replace("inactive", "active");
  });

  themeBtn?.addEventListener("mouseout", () => {
    themeCont?.classList.replace("active", "inactive");
  });
}

function handleNavHoverEvents() {
  const navBtns = document.querySelectorAll(".nav-parent");
  navBtns.forEach((nav) => {
    nav.addEventListener("mouseenter", () => {
      nav.querySelector(".nav")?.classList.add("nav-hovered");
    });

    nav.addEventListener("mouseleave", () => {
      nav.querySelector(".nav")?.classList.remove("nav-hovered");
    });
  });
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
