import { useImperativeHandle, forwardRef, useRef, useEffect } from "react";
import Review from "./Review";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../../utility/async";
import FadeIn from "../FadeIn";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SERVER_PORT);

const Reviews = forwardRef((props, ref) => {
  const scrollRef = useRef(null);

  const { data: reviews, isLoading } = useQuery({
    queryFn: () => fetchData("/reviews"),
    queryKey: ["reviews"],
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const handleNewReview = () => {
      queryClient.invalidateQueries(["reviews"]);
    };

    socket.on("reviews", handleNewReview);

    return () => {
      socket.off("reviews", handleNewReview);
    };
  }, [queryClient]);

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
    <FadeIn>
      <div
        ref={scrollRef}
        className="no-scroll flex gap-8 items-start mt-20 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4"
      >
        {reviews.data.length > 0 &&
          reviews.data.map((review, index) => (
            <Review index={index} review={review} key={review.createdAt} />
          ))}
      </div>
    </FadeIn>
  );
});

export default Reviews;
