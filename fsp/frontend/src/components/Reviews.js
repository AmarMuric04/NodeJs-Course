import React, {
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
  useEffect,
} from "react";
import Review from "./Review";

const Reviews = forwardRef((props, ref) => {
  const [reviews, setReviews] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleGetReviews = async () => {
      try {
        const response = await fetch("http://localhost:8080/reviews");

        const data = await response.json();
        setReviews(data.reviews);
      } catch (error) {
        console.error(error);
      }
    };

    handleGetReviews();
  }, []);

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

  return (
    <div
      ref={scrollRef}
      className="flex gap-8 items-start mt-20 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
    >
      {reviews.length > 0 &&
        reviews.map((review) => (
          <Review review={review} key={review.createdAt} />
        ))}
    </div>
  );
});

export default Reviews;
