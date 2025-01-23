import Count from "./SingleValues/Count";

export default function Statistic({ title, icon, url, id }) {
  return (
    <div className="flex flex-col items-center gap-2 transition duration-1000">
      <p className="font-semibold text-gray-500">{title}</p>
      {icon}
      <div className="cursor-pointer text-3xl font-semibold p-4 px-5 rounded-full bg-orange-500 scale-75 bg-opacity-20 hover:scale-90 hover:bg-opacity-75 transition-all">
        <Count URL={url} id={id} />
      </div>
    </div>
  );
}
