export function Star({
  starClick,
  rating,
  index,
  onMouseEnter,
  onMouseLeave,
  hover,
}) {
  const fullStarValue = index + 1;
  const halfStarValue = index + 0.5;

  return (
    <div className="flex">
      <div key={`half-${index}`} className="relative flex items-center">
        <div
          onMouseEnter={() => onMouseEnter(halfStarValue)}
          onMouseLeave={onMouseLeave}
          onClick={() => starClick(halfStarValue)}
          className="w-4 overflow-hidde"
        >
          <svg
            className={`w-8 h-8 cursor-pointer ${
              hover >= halfStarValue || rating >= halfStarValue
                ? "text-yellow-400"
                : "text-gray-400"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
          >
            <path
              fill="currentColor"
              d="M11.45 11.22L1.28 12.7l7.36 7.17L6.9 30l9.1-4.78V2z"
            />
          </svg>
        </div>

        <div
          onMouseEnter={() => onMouseEnter(fullStarValue)}
          onMouseLeave={onMouseLeave}
          onClick={() => starClick(fullStarValue)}
          className="w-4 overflow-hidden"
        >
          <svg
            className={`w-8 h-8 cursor-pointer relative z-0 right-4 ${
              hover >= fullStarValue || rating >= fullStarValue
                ? "text-yellow-400"
                : "text-gray-400"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
          >
            <path
              fill="currentColor"
              d="m10.5 5.4l5.5.8l-4 3.8l.9 5.5L8 12.9V.4z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
