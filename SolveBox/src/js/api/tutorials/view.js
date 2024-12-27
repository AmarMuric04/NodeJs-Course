import { transformText } from "../../../utility/utility.js";

export const View = {
  displayResources(en, sr, element) {
    let iterations = 0;
    en.forEach((a) => {
      let [key, value] = a;
      const main = document.createElement("div");
      main.classList = "relative flex flex-col";

      const wrapper = document.createElement("div");
      wrapper.classList = "flex relative mb-8";

      const mainTitle = document.createElement("h1");
      mainTitle.classList =
        "pl-16 px-2 background z-50 relative text-xl font-bold";
      mainTitle.textContent = transformText(key);

      const mainLine = document.createElement("div");
      mainLine.classList = "h-[1px] w-full absolute top-2/3 bg4";

      wrapper.append(mainTitle);
      wrapper.append(mainLine);

      const list = document.createElement("ul");
      list.classList = "apps ml-16 flex mb-8 gap-8 info relative min-h-[10rem]";

      const aboutContent = Object.entries(value);
      if (aboutContent) {
        aboutContent.forEach((a) => {
          [key, value] = a;
          const container = document.createElement("div");
          container.classList = "bg-white w-[20rem] text-black p-4";

          const title = document.createElement("h1");
          title.classList = "font-bold text-xl text" + (1 + (iterations % 3));
          title.textContent = value.name;

          const line = document.createElement("div");
          line.classList = "h-[2px] w-1/2 top-2/3 bg" + (1 + (iterations % 3));

          const description = document.createElement("p");
          description.classList = "text-gray-600 mt-2 mb-4";
          description.textContent = value.description;

          const link = document.createElement("a");
          link.setAttribute("href", value.url);

          const button = document.createElement("button");
          button.classList =
            "px-4 py-2 font-semibold text-white rounded-[2rem] hover:rounded-none transition-all float-end bg" +
            (1 + (iterations % 3));
          button.textContent = "Go to App >";

          container.append(title);
          container.append(line);
          container.append(description);
          link.append(button);
          container.append(link);

          list.append(container);

          main.append(wrapper);
          main.append(list);
          element.append(main);
        });
      }
      iterations++;
    });
  },

  displayTutorials(en, sr, element) {
    en.forEach((e, index) => {
      const [_, value] = e;
      const [m, srValue] = sr[index];

      const container = document.createElement("div");
      container.classList =
        "child flex flex-col justify-between p-4 bg-white min-w-[49%] max-w-[49%]";

      const title = document.createElement("p");
      title.classList = "noto text1 uppercase";
      title.textContent = value.type;
      title.setAttribute("data-english", value.type);
      title.setAttribute("data-srpski", srValue.type);

      const text = document.createElement("p");
      text.classList = "ml-4 text-gray-600 my-4";

      if (value.type !== "text") {
        text.textContent = value.title;
        text.setAttribute("data-english", value.title);
        text.setAttribute("data-srpski", srValue.title);

        const link = document.createElement("a");
        link.setAttribute("href", value.link);

        const button = document.createElement("button");
        button.classList =
          "background text-white rounded-[2rem] px-4 py-2 hover:rounded-none transition-all";
        button.textContent = "Go to Tutorial";
        button.setAttribute("data-english", "Go to Tutorial");
        button.setAttribute("data-srpski", "Idi do Tutoriala");

        link.append(button);
        container.prepend(link);
        container.prepend;
      } else {
        text.textContent = value.content;
        text.setAttribute("data-english", value.content);
        text.setAttribute("data-srpski", srValue.content);
      }
      container.prepend(text);
      container.prepend(title);
      element.append(container);
    });
  },

  displayError(element) {
    const error = `<div class="w-full h-full text-center flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-red-400 bg-red-600 bg-opacity-50"><p>404 ERROR! Content not found! <br/> If the error doesn't go away, please contact us!</p></div>`;

    element.innerHTML += error;
  },
};
