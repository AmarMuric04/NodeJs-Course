import { handleUnderlineHover } from "../../general_view.js";
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
      const api = await getAPI("../../assets/api.json");
      console.log(this.API);
      this.enAPI = api.puzzles?.english[currentPuzzle];
      this.srAPI = api.puzzles?.srpski[currentPuzzle];
      document.querySelectorAll(".loader").forEach((e) => e.remove());
    } catch (error) {
      console.error("Failed to initialize API:", error);
    }

    const tips = document.querySelector(".tips");
    this.enAPI?.content?.tips?.forEach((t, index) => {
      const li = document.createElement("li");
      li.classList = "ml-8 text-lg";
      li.setAttribute("data-set-english", "-- " + t);
      li.setAttribute(
        "data-set-srpski",
        "-- " + this.srAPI?.content?.tips[index]
      );
      li.textContent = "-- " + t;
      tips.append(li);
    });

    const title = document.querySelector(".title");
    if (title) {
      title.textContent = this.enAPI?.name;
      title.setAttribute("data-set-english", this.enAPI?.name);
      title.setAttribute("data-set-srpski", this.srAPI?.name);
    }

    const funFact = document.querySelector(".fun-fact");
    if (funFact) {
      funFact.textContent = '"' + this.enAPI["fun_fact"] + '"';
      funFact.setAttribute(
        "data-set-english",
        '"' + this.enAPI["fun_fact"] + '"'
      );
      funFact.setAttribute(
        "data-set-srpski",
        '"' + this.srAPI["fun_fact"] + '"'
      );
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
    }

    const video = document.querySelector(".tutorials");
    const iframe = document.createElement("iframe");

    iframe.src = this.enAPI["main_video"];
    iframe.className = "w-full h-[720px]";
    iframe.title = "How To Solve A Rubik’s Cube | INTRODUCTION PART 1";
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    iframe.allowFullscreen = true;

    video.prepend(iframe);

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
      li.setAttribute("data-set-english", "-- " + t);
      li.setAttribute(
        "data-set-srpski",
        "-- " + this.srAPI["advanced_strategies"][index]
      );
      advanced.append(li);
    });

    const facts = document.querySelector(".facts");
    this.enAPI?.content["related_facts"].forEach((t, index) => {
      const li = document.createElement("li");
      li.classList = "ml-8 text-lg";
      li.textContent = "-- " + t;
      li.setAttribute("data-set-english", "-- " + t);
      li.setAttribute(
        "data-set-srpski",
        "-- " + this.srAPI?.content["related_facts"][index]
      );
      facts.append(li);
    });
  },
};