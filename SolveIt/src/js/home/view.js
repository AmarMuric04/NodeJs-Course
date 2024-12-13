export const View = {
  renderReviews(reviews) {
    const reviewsList = document.querySelector(".reviews");
    reviews.forEach((review) => {
      const reviewDiv = document.createElement("div");
      reviewDiv.classList =
        "bg-white review mb-12 flex h-[30rem] min-w-[75rem] w-[75rem]";

      const reviewImage = document.createElement("img");
      reviewImage.classList = "w-1/2";
      reviewImage.setAttribute("src", review.image);

      const reviewDoc = document.createElement("div");
      reviewDoc.classList = "p-16 flex flex-col justify-between";

      const svgElement = document.createElement("div");
      svgElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="3em" height="3em" viewBox="0 0 24 24" class="text-[#75e1d9]">
   <path fill="currentColor" d="M5.7 18L8 14q-1.65 0-2.825-1.175T4 10t1.175-2.825T8 6t2.825 1.175T12 10q0 .575-.137 1.063T11.45 12L8 18zm9 0l2.3-4q-1.65 0-2.825-1.175T13 10t1.175-2.825T17 6t2.825 1.175T21 10q0 .575-.137 1.063T20.45 12L17 18z" />
    </svg>`;

      const reviewTitle = document.createElement("p");
      reviewTitle.classList = "text-gray-400 italic text-xl my-4";
      reviewTitle.textContent = review.text;
      const reviewName = document.createElement("p");
      reviewName.classList = "my-4 font-semibold text-[2rem]";
      reviewName.textContent = review.name;
      const reviewProf = document.createElement("p");
      reviewProf.classList =
        "noto text-[0.6rem] text-[#cd0d83] tracking-[0.1rem] uppercase";
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
};
