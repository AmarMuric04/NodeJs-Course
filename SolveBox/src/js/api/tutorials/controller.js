import { handleUnderlineHover } from "../../general_view.js";
import { allowLangChange } from "../../language.js";
import { getAPI } from "../api.js";
import { Model } from "./model.js";
import { View } from "./view.js";

export const Controller = {
  enAPI: null,
  srAPI: null,

  async init() {
    handleUnderlineHover();
    const info = document.querySelectorAll(".info");

    let loader = `<svg class="loader absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text3" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24"><rect width="10" height="10" x="1" y="1" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle30" fill="freeze" attributeName="x" begin="0;svgSpinnersBlocksShuffle3b.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle31" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle38.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle32" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle39.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle33" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle3a.end" dur="0.2s" values="13;1"/></rect><rect width="10" height="10" x="1" y="13" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle34" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle30.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle35" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle31.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle36" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle32.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle37" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle33.end" dur="0.2s" values="13;1"/></rect><rect width="10" height="10" x="13" y="13" fill="currentColor" rx="1"><animate id="svgSpinnersBlocksShuffle38" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle34.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle39" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle35.end" dur="0.2s" values="13;1"/><animate id="svgSpinnersBlocksShuffle3a" fill="freeze" attributeName="x" begin="svgSpinnersBlocksShuffle36.end" dur="0.2s" values="1;13"/><animate id="svgSpinnersBlocksShuffle3b" fill="freeze" attributeName="y" begin="svgSpinnersBlocksShuffle37.end" dur="0.2s" values="1;13"/></rect></svg>`;

    info.forEach((e) => {
      e.innerHTML += loader;
    });

    let href = window.location.href;
    href = href.split("/").pop();
    href = href.slice(0, href.indexOf("."));

    const currentPuzzle = Model.domen[href];

    try {
      const api = await getAPI("./assets/api.json");
      console.log(this.API);
      this.enAPI = api.puzzles?.english[currentPuzzle];
      this.srAPI = api.puzzles?.srpski[currentPuzzle];

      console.log(api);
      document.querySelectorAll(".loader").forEach((e) => e.remove());
    } catch (error) {
      console.error("Failed to initialize API:", error);
    }

    const tips = document.querySelector(".tips");
    this.enAPI?.content?.tips?.forEach((t, index) => {
      const li = document.createElement("li");
      li.classList = "ml-8 text-lg";
      li.setAttribute("data-english", "-- " + t);
      li.setAttribute("data-srpski", "-- " + this.srAPI?.content?.tips[index]);
      li.textContent = "-- " + t;
      tips.append(li);
    });

    const title = document.querySelector(".title");
    if (title) {
      title.textContent = this.enAPI?.name;
      title.setAttribute("data-english", this.enAPI?.name);
      title.setAttribute("data-srpski", this.srAPI?.name);
    }

    const funFact = document.querySelector(".fun-fact");
    if (funFact) {
      funFact.textContent = '"' + this.enAPI["fun_fact"] + '"';
      funFact.setAttribute("data-english", '"' + this.enAPI["fun_fact"] + '"');
      funFact.setAttribute("data-srpski", '"' + this.srAPI["fun_fact"] + '"');
    }

    const resources = document.querySelector(".resources");
    const enRContent = Object.entries(this.enAPI?.content?.resources);
    const srRContent = Object.entries(this.srAPI?.content?.resources);

    if (enRContent) {
      View.displayResources(enRContent, srRContent, resources);
    } else View.displayError(resources);

    const historicalFact = document.querySelector(".historical-fact");
    if (funFact) {
      historicalFact.textContent = '"' + this.enAPI["historical_fact"] + '"';
      historicalFact.setAttribute(
        "data-english",
        '"' + this.enAPI["historical_fact"] + '"'
      );
      historicalFact.setAttribute(
        "data-srpski",
        '"' + this.srAPI["historical_fact"] + '"'
      );
    }

    const video = document.querySelector(".tutorials");

    const wrapper = document.createElement("div");
    wrapper.style.position = "relative";
    wrapper.style.width = "100%";
    wrapper.style.paddingTop = "56.25%";

    const iframe = document.createElement("iframe");

    iframe.src = this.enAPI["main_video"];
    iframe.style.position = "absolute";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.className = "w-full h-full";
    iframe.title = "How To Solve A Rubik’s Cube | INTRODUCTION PART 1";
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;

    wrapper.appendChild(iframe);

    video.prepend(wrapper);

    const tutorials = document.querySelector(".tutorials-list");
    const enTContent = Object.entries(this.enAPI?.content?.tutorials);
    const srTContent = Object.entries(this.srAPI?.content?.tutorials);

    if (enTContent) {
      View.displayTutorials(enTContent, srTContent, tutorials);
    } else View.displayError(tutorials);

    const advanced = document.querySelector(".advanced");
    this.enAPI["advanced_strategies"].forEach((t, index) => {
      const li = document.createElement("li");
      li.classList = "ml-8 text-lg";
      li.textContent = "-- " + t;
      li.setAttribute("data-english", "-- " + t);
      li.setAttribute(
        "data-srpski",
        "-- " + this.srAPI["advanced_strategies"][index]
      );
      advanced.append(li);
    });

    const facts = document.querySelector(".facts");
    this.enAPI?.content["related_facts"].forEach((t, index) => {
      const li = document.createElement("li");
      li.classList = "ml-8 text-lg";
      li.textContent = "-- " + t;
      li.setAttribute("data-english", "-- " + t);
      li.setAttribute(
        "data-srpski",
        "-- " + this.srAPI?.content["related_facts"][index]
      );
      facts.append(li);
    });

    const variations = document.querySelector(".variations");
    const enVContent = Object.entries(this.enAPI?.variations);

    if (enVContent) {
      enVContent.forEach((e, index) => {
        const [key, value] = e;
        const srValue = this.srAPI?.variations[index];
        const container = document.createElement("div");
        container.classList =
          "mb-10 bg-white w-full lg:w-[30%] p-4 flex flex-col justify-between";

        const title = document.createElement("h1");
        title.classList = "text-xl font-semibold";
        title.textContent = value.name;
        title.setAttribute("data-english", value.name);
        title.setAttribute("data-srpski", srValue.name);

        const imageWrapper = document.createElement("div");
        imageWrapper.classList =
          "h-[20rem] overflow-hidden w-full flex items-center justify-center";

        const image = document.createElement("img");
        image.classList =
          "max-h-[20rem] w-[20rem] lg:w-full object-cover bg-gray-200 w-full";
        image.src = value.image;

        imageWrapper.append(image);

        const wrapper1 = document.createElement("div");
        wrapper1.classList =
          "w-full flex justify-between mt-4 border-b-[1px] border-gray-200";

        const key1 = document.createElement("p");
        key1.classList = "font-semibold text-lg";
        key1.textContent = "Popularity:";
        key1.setAttribute("data-english", "Popularity:");
        key1.setAttribute("data-srpski", "Популарност:");

        const value1 = document.createElement("p");
        value1.textContent = value.popularity + "⭐";

        wrapper1.append(key1);
        wrapper1.append(value1);

        const wrapper2 = document.createElement("div");
        wrapper2.classList =
          "w-full flex justify-between mb-4 border-b-[2px] border-gray-200";

        const key2 = document.createElement("p");
        key2.classList = "font-semibold text-lg";
        key2.textContent = "Difficulty:";
        key2.setAttribute("data-english", "Difficulty:");
        key2.setAttribute("data-srpski", "Тежина:");

        const value2 = document.createElement("p");
        value2.textContent = value.difficulty;
        value2.setAttribute("data-english", value.difficulty);
        value2.setAttribute("data-srpski", srValue.difficulty);

        wrapper2.append(key2);
        wrapper2.append(value2);

        const text = document.createElement("p");
        text.classList = "text-gray-600 text-sm";
        text.textContent = value.description;
        text.setAttribute("data-english", value.description);
        text.setAttribute("data-srpski", srValue.description);

        let button, a;
        if (value.video) {
          a = document.createElement("a");
          a.setAttribute("href", value.video);
          a.setAttribute("target", "_blank");
          a.classList = "w-full";
          button = document.createElement("button");
          button.classList =
            "mt-10 py-2 px-4 font-semibold rounded-[2rem] hover:rounded-none transition-all background w-full";
          button.textContent = "How to solve?";
          button.setAttribute("data-english", "How to solve?");
          button.setAttribute("data-srpski", "Како решити?");

          a.append(button);
        }

        container.append(title);
        container.append(imageWrapper);
        container.append(wrapper1);
        container.append(wrapper2);
        container.append(text);

        if (button) container.append(a);

        variations.append(container);
      });

      allowLangChange();
    }
  },
};
