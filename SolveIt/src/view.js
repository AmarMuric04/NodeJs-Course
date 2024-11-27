export function renderReviews(reviews) {
  const reviewsList = document.querySelector(".reviews");

  reviews.forEach((review) => {
    reviewsList.innerHTML += ` 
           <div class="bg-white review mb-12 flex h-[30rem] min-w-[80rem] w-[80rem]">
              <img
                class="w-1/2"
                src="${review.image}"
              />
              <div class="p-16 flex flex-col justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="3em"
                  height="3em"
                  viewBox="0 0 24 24"
                  class="text-[#75e1d9]"
                >
                  <path
                    fill="currentColor"
                    d="M5.7 18L8 14q-1.65 0-2.825-1.175T4 10t1.175-2.825T8 6t2.825 1.175T12 10q0 .575-.137 1.063T11.45 12L8 18zm9 0l2.3-4q-1.65 0-2.825-1.175T13 10t1.175-2.825T17 6t2.825 1.175T21 10q0 .575-.137 1.063T20.45 12L17 18z"
                  />
                </svg>
                <p class="text-gray-400 italic text-xl my-4">
                  ${review.text}
                </p>
                <p class="my-4 font-semibold text-[2rem]">${review.name}</p>
                <p
                  class="noto text-[0.6rem] text-[#cd0d83] tracking-[0.1rem] uppercase"
                >
                  ${review.profession}
                </p>
              </div>
            </div>`;
  });
}
