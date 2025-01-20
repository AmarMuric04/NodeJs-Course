import { useEffect, useState } from "react";

export function Modal({ type, user, setType }) {
  useEffect(() => {
    if (type) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    };
  }, [type]);

  return (
    <div className="w-screen h-screen grid place-items-center absolute z-50 bg-black bg-opacity-50 top-0 left-0 backdrop-blur-md">
      <div>
        <button
          onClick={() => setType(null)}
          className="absolute top-10 left-10 w-10 h-10 rounded-full grid place-items-center hover:bg-white hover:bg-opacity-10 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M20 20L4 4m16 0L4 20"
            />
          </svg>
        </button>
        {type === "pfp" && (
          <img
            className="ml-4 border-[#222] w-80 h-80 rounded-full object-cover"
            src={`http://localhost:8080/` + user.imageUrl}
            alt="Pfp"
          />
        )}
        {type === "banner" && (
          <img
            className="w-full h-[25rem] object-cover"
            src={`http://localhost:8080` + user.bannerImage}
            alt="Banner"
          />
        )}
      </div>
    </div>
  );
}
