import React, { useImperativeHandle, useRef, forwardRef } from "react";
import Review from "./Review";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utility/async";

const Reviews = forwardRef((props, ref) => {
  const scrollRef = useRef(null);

  const { data: reviews, isLoading } = useQuery({
    queryFn: () => fetchData("/reviews"),
    queryKey: ["reviews"],
  });

  useImperativeHandle(
    ref,
    () => ({
      scrollLeft: () => {
        scrollRef.current.scrollBy({
          left: -300,
          behavior: "smooth",
        });
      },
      scrollRight: () => {
        scrollRef.current.scrollBy({
          left: 300,
          behavior: "smooth",
        });
      },
    }),
    []
  );

  if (isLoading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <div
      ref={scrollRef}
      className="no-scroll flex gap-8 items-start mt-20 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
    >
      {reviews.data.length > 0 &&
        reviews.data.map((review) => (
          <Review review={review} key={review.createdAt} />
        ))}
    </div>
  );
});

export default Reviews;
