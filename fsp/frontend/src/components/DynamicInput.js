import { useState } from "react";

const DynamicInput = ({ name, deleteInput }) => {
  return (
    <div className="flex justify-between gap-2 my-2">
      <input
        className="py-2 px-4 rounded-md border-2 w-full bg-white"
        type="text"
        placeholder={name}
        name={name}
      />
      <p
        className="bg-red-400 w-10 h-10 flex justify-center items-center text-white cursor-pointer rounded-md"
        onClick={deleteInput}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1"
          />
        </svg>
      </p>
    </div>
  );
};

export default DynamicInput;
