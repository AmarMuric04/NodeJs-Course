import FadeIn from "./FadeIn";

export default function Section({
  className,
  containerClass,
  bg,
  svg,
  children,
}) {
  return (
    <section
      className={`bg-${bg} overflow-y-hidden w-full flex justify-center relative ${
        className || ""
      }`}
    >
      {svg}
      <FadeIn>
        <div
          className={`w-[75rem] transition duration-1000 ${
            containerClass || ""
          }`}
        >
          {children}
        </div>
      </FadeIn>
    </section>
  );
}
