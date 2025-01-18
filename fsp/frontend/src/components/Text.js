export default function Text({ className, children }) {
  return (
    <p className={`text-gray-400 text-lg ${className && className}`}>
      {children}
    </p>
  );
}
