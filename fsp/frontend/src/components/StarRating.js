import { useState } from "react";
import { Star } from "./Star";

export function StarRating({ stars, rating, setRating }) {
  const [hover, setHover] = useState(0);

  const handleMouseEnter = (value) => {
    setHover(value);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };
  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <div className="flex justify-center">
      {[...Array(stars)].map((_, index) => (
        <Star
          starClick={handleStarClick}
          rating={rating}
          index={index}
          key={index}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          hover={hover}
          setHover={setHover}
        />
      ))}
    </div>
  );
}
