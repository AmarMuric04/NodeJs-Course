import { useIntersectionObserver } from "../utility/hooks";
import { useState, useEffect } from "react";

export default function FadeIn({ className, duration = 1000, children }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [ref, isVisible] = useIntersectionObserver({
    root: null,
    rootMargin: "-200px",
    threshold: 0,
  });

  useEffect(() => {
    if (isVisible && !hasAnimated) setHasAnimated(true);
  }, [isVisible, hasAnimated]);

  return (
    <div
      ref={ref}
      className={`transition duration-${duration} ${
        hasAnimated ? "in-view" : "not-in-view"
      } ${className || ""}`}
    >
      {children}
    </div>
  );
}
