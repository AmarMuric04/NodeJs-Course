import { useState } from "react";

const Input = ({
  extraClasses,
  normalClass,
  onErrorClass,
  input,
  label,
  error,
  name,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  let hasError = error?.data?.find((err) => err.path === name);

  let handleFileClick;

  if (input === "file")
    handleFileClick = () => {
      document.getElementById("file-input").click();
    };

  return (
    <div className="mb-4 flex flex-col">
      <label className={`${hasError && !isFocused && "text-red-600"}`}>
        {label}
      </label>

      {input === "input" && (
        <input
          id={name}
          name={name}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`py-2 px-4 rounded-md border-2 w-full text-black ${
            extraClasses && extraClasses
          } ${hasError && !isFocused ? onErrorClass : normalClass}`}
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
          } ${hasError && !isFocused ? onErrorClass : normalClass}`}
          {...props}
        />
      )}
      {input === "file" && (
        <div className="relative group">
          <button
            type="button"
            onClick={handleFileClick}
            className={`py-2 px-4 rounded-md w-full bg-purple-500 group-hover:bg-orange-500 transition-all text-white ${
              extraClasses ? extraClasses : ""
            } ${hasError && !isFocused ? onErrorClass : normalClass}`}
          >
            Upload an image
          </button>

          <input
            name={name}
            id="file-input"
            type="file"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer *:${
              hasError && !isFocused ? onErrorClass : normalClass
            }`}
            {...props}
          />
        </div>
      )}
      {hasError && hasError.msg && !isFocused && (
        <div className="text-red-600 text-xs flex items-center gap-1 mt-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07m12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32M9 5h2v6H9zm0 8h2v2H9z"
            />
          </svg>
          <p>{hasError.msg}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
