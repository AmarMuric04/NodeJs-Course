export default function Title({ className, children }) {
  return (
    <h1
      className={`text-[3rem] font-bold my-4 leading-[3rem] ${
        className && className
      }`}
    >
      {children}
    </h1>
  );
}
