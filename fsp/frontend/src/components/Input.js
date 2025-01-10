import { useState } from "react";

const Input = ({ extraClasses, input, label, error, name, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  let hasError = error?.data?.find((err) => err.path === name);

  let handleFileClick;

  if (input === "file")
    handleFileClick = () => {
      document.getElementById("file-input").click();
    };

  return (
    <div>
      {hasError && hasError.msg && !isFocused ? (
        <p className="text-red-600 mb-1 text-sm">{hasError.msg}</p>
      ) : (
        <label>{label}</label>
      )}
      {input === "input" && (
        <input
          id={name}
          name={name}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`py-2 px-4 rounded-md border-2 w-full text-black ${
            extraClasses && extraClasses
          } ${
            hasError && !isFocused
              ? "border-red-600 bg-red-400 bg-opacity-20"
              : "bg-white"
          }`}
          {...props}
        />
      )}
      {input === "textarea" && (
        <textarea
          id={name}
          name={name}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`py-2 px-4 rounded-md text-black border-2 w-full max-w-full h-[10rem] min-h-[10rem] max-h-[10rem] ${
            extraClasses && extraClasses
          } ${
            hasError && !isFocused && "border-red-600 bg-red-400 bg-opacity-20"
          }`}
          {...props}
        />
      )}
      {input === "file" && (
        <div className="relative">
          <button
            type="button"
            onClick={handleFileClick}
            className={`py-2 px-4 rounded-md w-full bg-purple-500 hover:bg-orange-500 transition-all text-white ${
              extraClasses ? extraClasses : ""
            }`}
          >
            Upload an image
          </button>

          <input
            name={name}
            id="file-input"
            type="file"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer pointer-events-none"
            {...props}
          />
        </div>
      )}
    </div>
  );
};

export default Input;
