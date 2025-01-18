import Count from "./SingleValues/Count";
import { useIntersectionObserver } from "../utility/hooks";

export default function Statistic({ title, icon, url }) {
  const [ref, isVisible] = useIntersectionObserver({
    root: null,
    rootMargin: "-50px",
    threshold: 0,
  });

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center gap-2 transition duration-1000 ${
        isVisible ? "in-view" : "not-in-view"
      }`}
    >
      <p className="font-semibold text-gray-500">{title}</p>
      {icon}
      <p className="cursor-pointer text-3xl font-semibold p-4 px-5 rounded-full bg-orange-500 scale-75 bg-opacity-20 hover:scale-90 hover:bg-opacity-75 transition-all">
        <Count URL={url} />
      </p>
    </div>
  );
}
