import { useState } from "react";

const DynamicInput = ({ text, className, name, deleteInput, ...props }) => {
  return (
    <div className="flex justify-between gap-2 my-2">
      <input
        className={`${className && className}`}
        type="text"
        placeholder={text}
        name={name}
        {...props}
      />
      <p
        className="bg-purple-500 hover:bg-orange-500 transition-all w-10 h-10 flex justify-center items-center text-white cursor-pointer rounded-md"
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
