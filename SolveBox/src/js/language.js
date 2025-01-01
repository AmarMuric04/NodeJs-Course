let curr_lang = localStorage.getItem("SolveBox-current-language") || "english";
let items;

const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key, value) {
  const event = new Event("localStorageChange");
  event.key = key;
  event.newValue = value;
  originalSetItem.apply(this, arguments);
  window.dispatchEvent(event);
};

function changeLanguage(l) {
  localStorage.setItem("SolveBox-current-language", l.target.value);
  curr_lang = l.target.value;
  items.forEach((e) => {
    e.textContent = e.getAttribute("data-" + curr_lang);
  });
}

export function allowLangChange() {
  items = document.querySelectorAll("[data-english], [data-srpski]");

  items.forEach((e) => {
    e.textContent = e.getAttribute("data-" + curr_lang);
  });

  const lang = document.getElementById("lang");
  const options = document.querySelectorAll("#lang option");
  options.forEach((e) => {
    if (e.value === curr_lang) e.selected = true;
  });

  const onLanguageChange = (event) => changeLanguage(event);

  lang?.removeEventListener("change", onLanguageChange);

  setTimeout(() => {
    lang?.addEventListener("change", onLanguageChange);
  }, 10);
}

export function getLang() {
  return curr_lang;
}

document.addEventListener("DOMContentLoaded", () => {
  allowLangChange();
});
