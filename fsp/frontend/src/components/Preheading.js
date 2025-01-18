export default function Preheading({ children }) {
  return (
    <h2 className="text-xs uppercase leading-[0.1rem] text-orange-500 font-semibold">
      {children}
    </h2>
  );
}
