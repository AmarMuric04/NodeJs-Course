import { Model } from "./model.js";
import { handleUnderlineHover } from "../../general_view.js";
import { getAPI } from "../api.js";
import { transformText } from "../../../utility/utility.js";
import { allowLangChange } from "../../language.js";

export const Controller = {
  enAPI: null,
  srAPI: null,

  async init() {
    handleUnderlineHover();
    const elements = document.querySelectorAll(".element");
    const info = document.querySelectorAll(".info");

    info.forEach((e) => {
      e.innerHTML += `<svg class="loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text3" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle30" fill="freeze" attributeName="x" begin="0;svgSpinnersBlocksShuffle3b.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle31" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle38.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle32" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle39.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle33" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle3a.end" dur="0.2s" values="13;1"/></rect><rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle34" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle30.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle35" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle31.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle36" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle32.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle37" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle33.end" dur="0.2s" values="13;1"/></rect><rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle38" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle34.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle39" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle35.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle3a" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle36.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle3b" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle37.end" dur="0.2s" values="1;13"/></rect></svg>`;
    });

    try {
      const api = await getAPI("./assets/api.json");
      this.enAPI = api.puzzles.english;
      this.srAPI = api.puzzles.srpski;
      document.querySelectorAll(".loader").forEach((e) => e.remove());
    } catch (error) {
      console.error("Failed to initialize API: ", error);
    }

    elements.forEach((e, i) => {
      const enPuzzle = this.enAPI[i];
      const srPuzzle = this.srAPI[i];
      const variation = e.querySelector(".variations div");
      enPuzzle?.variations?.forEach((V, index) => {
        const a = document.createElement("a");
        a.setAttribute("href", "...");
        a.classList = "flex-shrink-0 ";

        const li = document.createElement("li");
        li.classList =
          "cursor-pointer px-4 py-1 text-sm rounded-[2rem] hover:rounded-none transition-all border-[1px] border1";
        li.textContent =
          lang === "english" ? V.name : srPuzzle?.variations[index].name;
        li.setAttribute("data-english", V.name);
        li.setAttribute("data-srpski", srPuzzle?.variations[index].name);

        a.append(li);
        variation.append(a);
      });

      const image = e.querySelector(".image");
      if (image) {
        image.src =
          lang === "english" ? enPuzzle["main_image"] : srPuzzle["main_image"];
      }

      const title = e.querySelector(".title");
      if (title) {
        title.textContent =
          lang === "english" ? enPuzzle?.name : srPuzzle?.name;
        title.setAttribute("data-english", enPuzzle?.name);
        title.setAttribute("data-srpski", srPuzzle?.name);
      }

      const description = e.querySelector(".description");
      if (description) {
        description.textContent =
          lang === "english" ? enPuzzle?.description : srPuzzle?.description;
        description.setAttribute("data-english", enPuzzle?.description);
        description.setAttribute("data-srpski", srPuzzle?.description);
      }

      const history = e.querySelector(".history");
      if (enPuzzle?.history) {
        Object.entries(enPuzzle.history).forEach(([key, enValue]) => {
          const srValue = srPuzzle.history[key];
          const li = document.createElement("li");
          li.classList = "flex gap-2";
          const p1 = document.createElement("p");
          p1.classList = "font-bold";
          const p2 = document.createElement("p");

          p1.textContent =
            lang === "english"
              ? transformText(key) + ":"
              : transformText(key) + ":";
          p2.textContent = lang === "english" ? enValue : srValue;
          p1.setAttribute("data-english", transformText(key) + ":");
          p1.setAttribute("data-srpski", transformText(key) + ":");
          p2.setAttribute("data-english", enValue);
          p2.setAttribute("data-srpski", srValue);

          li.append(p1);
          li.append(p2);

          history.append(li);
        });
      }
    });

    allowLangChange();
  },
};
