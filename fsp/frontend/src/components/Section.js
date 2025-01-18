import { useEffect, useState } from "react";
import { useIntersectionObserver } from "../utility/hooks";

export default function Section({
  className,
  containerClass,
  bg,
  svg,
  children,
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, isVisible] = useIntersectionObserver({
    root: null,
    rootMargin: "-200px",
    threshold: 0,
  });

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isVisible, hasAnimated]);

  return (
    <section
      className={`bg-${bg} overflow-y-hidden w-full flex justify-center relative ${
        className || ""
      }`}
    >
      {svg}
      <div
        ref={ref}
        className={`w-[75rem] transition duration-1000 ${
          containerClass || ""
        } ${hasAnimated ? "in-view" : "not-in-view"}`}
      >
        {children}
      </div>
    </section>
  );
}
