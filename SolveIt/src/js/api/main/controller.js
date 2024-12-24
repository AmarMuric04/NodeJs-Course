import { Model } from "./model.js";
import { handleUnderlineHover } from "../../general_view.js";
import { getAPI } from "../api.js";

export const Controller = {
  API: null,

  async init() {
    handleUnderlineHover();
    const elements = document.querySelectorAll(".element");
    const info = document.querySelectorAll(".info");

    info.forEach((e) => {
      e.innerHTML += `<svg class="loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text3" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle30" fill="freeze" attributeName="x" begin="0;svgSpinnersBlocksShuffle3b.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle31" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle38.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle32" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle39.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle33" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle3a.end" dur="0.2s" values="13;1"/></rect><rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle34" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle30.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle35" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle31.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle36" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle32.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle37" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle33.end" dur="0.2s" values="13;1"/></rect><rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle38" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle34.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle39" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle35.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle3a" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle36.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle3b" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle37.end" dur="0.2s" values="1;13"/></rect></svg>`;
    });

    try {
      this.API = await getAPI();
      this.API = this.API.puzzles;
      document.querySelectorAll(".loader").forEach((e) => e.remove());
    } catch (error) {
      console.error("Failed to initialize API:", error);
    }

    elements.forEach((e, i) => {
      const puzzle = this.API[i];
      const variation = e.querySelector(".variations div");
      puzzle?.variations?.forEach((V) => {
        const a = document.createElement("a");
        a.setAttribute("href", "...");
        a.classList = "flex-shrink-0 ";

        const li = document.createElement("li");
        li.classList =
          "cursor-pointer px-4 py-1 text-sm rounded-[2rem] hover:rounded-none transition-all border-[1px] border1";
        li.textContent = V.name;

        a.append(li);
        variation.append(a);
      });

      const title = e.querySelector(".title");
      if (title) {
        title.textContent = puzzle?.name;
      }

      const description = e.querySelector(".description");
      if (description) {
        description.textContent = puzzle?.description;
      }

      const history = e.querySelector(".history");

      if (puzzle?.history) {
        Object.entries(puzzle.history).forEach((H) => {
          const li = document.createElement("li");
          li.classList = "flex gap-2";
          const p1 = document.createElement("p");
          p1.classList = "font-bold";
          const p2 = document.createElement("p");

          const [key, value] = H;

          let key_text = key[0].toUpperCase() + key.slice(1);

          key_text = key_text.replaceAll("_", " ");
          let parts = key_text.split(" ");
          for (let i = 1; i < parts.length; i++) {
            parts[i] = parts[i][0].toUpperCase() + parts[i].slice(1);
          }
          key_text = parts.join(" ");

          p1.textContent = key_text + ":";
          p2.textContent = value;

          li.append(p1);
          li.append(p2);

          history.append(li);
        });
      }
    });
  },
};
