document.addEventListener("DOMContentLoaded", () => {
  const lang = document.getElementById("lang");
  const items = document.querySelectorAll(
    "[data-set-english], [data-set-srpski]"
  );
  lang.addEventListener("change", (l) => {
    items.forEach((e) => {
      e.textContent = e.getAttribute("data-set-" + l.target.value);
    });
  });
});
