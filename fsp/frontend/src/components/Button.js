export default function Button({ className, children }) {
  return (
    <button
      className={`bg-purple-500 hover:bg-orange-500 rounded-[2rem] hover:rounded-none transition-all ${
        className && className
      }`}
    >
      {children}
    </button>
  );
}
