export function handleUnderlineHover() {
  const btn = document.querySelectorAll(".underline-parent");
  btn.forEach((b) => {
    b.addEventListener("mouseenter", () => {
      b.querySelector(".underline-child")?.classList.add("underline-hovered");
    });

    b.addEventListener("mouseleave", () => {
      b.querySelector(".underline-child")?.classList.remove(
        "underline-hovered"
      );
    });
  });
}
