const Input = ({ error, name, ...props }) => {
  let hasError = error?.data?.some((err) => err.path === name);

  return (
    <div>
      {hasError && (
        <p className="text-red-600 mb-1">
          {error.data?.find((err) => err.path === name)?.msg}
        </p>
      )}
      <input
        className={`py-2 px-4 rounded-md border-2 ${
          hasError && "border-red-600 bg-red-400 bg-opacity-20"
        }`}
        {...props}
      />
    </div>
  );
};

export default Input;
