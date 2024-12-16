import { loader } from "../general_view.js";
import * as Utility from "../../utility/utility.js";

export const View = {
  renderReviews(reviews) {
    const reviewsList = document.querySelector(".reviews");
    reviews.forEach((review) => {
      const reviewDiv = document.createElement("div");
      reviewDiv.classList =
        "bg-white w-screen min-w-[21rem] review mb-12 flex h-auto lg:h-[30rem] lg:min-w-[75rem] lg:w-[75rem] flex-col lg:flex-row";

      const reviewImage = document.createElement("img");
      reviewImage.classList =
        "w-28 h-28 rounded-full object-cover lg:h-auto lg:rounded-none lg:w-1/2 p-4 lg:p-0";
      reviewImage.setAttribute("src", review.image);

      const reviewDoc = document.createElement("div");
      reviewDoc.classList = "p-8 pt-0 lg:p-16 flex flex-col justify-between";

      const svgElement = document.createElement("div");
      svgElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" class="text-[#75e1d9]">
   <path fill="currentColor" d="M5.7 18L8 14q-1.65 0-2.825-1.175T4 10t1.175-2.825T8 6t2.825 1.175T12 10q0 .575-.137 1.063T11.45 12L8 18zm9 0l2.3-4q-1.65 0-2.825-1.175T13 10t1.175-2.825T17 6t2.825 1.175T21 10q0 .575-.137 1.063T20.45 12L17 18z" />
    </svg>`;

      const reviewTitle = document.createElement("p");
      reviewTitle.classList = "text-gray-400 italic text-sm lg:text-xl my-4";
      reviewTitle.textContent = review.text;
      const reviewName = document.createElement("p");
      reviewName.classList =
        "my-4 font-semibold text-[1rem] lg:text-[2rem] text-black";
      reviewName.textContent = review.name;
      const reviewProf = document.createElement("p");
      reviewProf.classList =
        "noto text-[0.4rem] lg:text-[0.6rem] text-[#cd0d83] tracking-[0.1rem] uppercase";
      reviewProf.textContent = review.profession;

      reviewDiv.append(reviewImage);
      reviewDoc.appendChild(svgElement);
      reviewDoc.append(reviewTitle);
      reviewDoc.append(reviewName);
      reviewDoc.append(reviewProf);
      reviewDiv.append(reviewDoc);
      reviewsList.appendChild(reviewDiv);
    });
  },

  updateButtonStatus(button) {
    button.innerHTML = "Subscribing..." + loader();
    Utility.disableButton(button);

    setTimeout(() => {
      button.innerHTML = "Subscribed " + "😀";
    }, 3000);

    setTimeout(() => {
      button.innerHTML = "Subscribe";
      button.disabled = false;
    }, 6000);
  },
};
