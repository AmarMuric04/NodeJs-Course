let curr_lang = localStorage.getItem("SolveBox-current-language");

const originalSetItem = localStorage.setItem;
localStorage.setItem = function (key, value) {
  const event = new Event("localStorageChange");
  event.key = key;
  event.newValue = value;
  originalSetItem.apply(this, arguments);
  window.dispatchEvent(event);
};

export function getLang() {
  return curr_lang;
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = document.getElementById("lang");
  const items = document.querySelectorAll("[data-english], [data-srpski]");

  items.forEach((e) => {
    e.textContent = e.getAttribute("data-" + curr_lang);
  });

  lang.addEventListener("change", (l) => {
    localStorage.setItem("SolveBox-current-language", l.target.value);
    curr_lang = l.target.value;
    items.forEach((e) => {
      e.textContent = e.getAttribute("data-" + l.target.value);
    });
  });
});
