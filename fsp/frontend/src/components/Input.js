import { useState } from "react";

const Input = ({ input, label, error, name, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  let hasError = error?.data?.find((err) => err.path === name);

  return (
    <div>
      {hasError && hasError.msg && !isFocused ? (
        <p className="text-red-600 mb-1 text-sm">{hasError.msg}</p>
      ) : (
        <p>{label}</p>
      )}
      {input === "input" ? (
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`py-2 px-4 rounded-md border-2 w-full ${
            hasError && !isFocused && "border-red-600 bg-red-400 bg-opacity-20"
          }`}
          {...props}
        />
      ) : (
        <textarea
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`py-2 px-4 rounded-md border-2 w-full max-w-full h-[10rem] min-h-[10rem] max-h-[10rem] ${
            hasError && !isFocused && "border-red-600 bg-red-400 bg-opacity-20"
          }`}
          {...props}
        />
      )}
    </div>
  );
};

export default Input;
