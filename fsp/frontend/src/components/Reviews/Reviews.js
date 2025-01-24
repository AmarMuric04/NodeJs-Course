import { useImperativeHandle, forwardRef, useRef } from "react";
import Review from "./Review";
import FadeIn from "../FadeIn";

const Reviews = forwardRef((props, ref) => {
  const scrollRef = useRef(null);

  useImperativeHandle(
    ref,
    () => ({
      scrollLeft: () => {
        scrollRef.current?.scrollBy({
          left: -300,
          behavior: "smooth",
        });
      },
      scrollRight: () => {
        scrollRef.current?.scrollBy({
          left: 300,
          behavior: "smooth",
        });
      },
    }),
    []
  );

  if (props.isLoading) {
    return <p>Loading reviews...</p>;
  }

  return (
    <FadeIn>
      <div
        ref={scrollRef}
        className="no-scroll flex gap-8 items-start overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
      >
        {props.reviews?.length > 0 ? (
          props.reviews.map((review, index) => (
            <Review index={index} review={review} key={review.createdAt} />
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </FadeIn>
  );
});

export default Reviews;
