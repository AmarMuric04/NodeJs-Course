import { useQuery } from "@tanstack/react-query";
import Section from "../components/Section";
import { fetchData } from "../utility/async";
import Reviews from "../components/Reviews/Reviews";
import { Star } from "../assets/icons";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function AllReviews() {
  const { data: reviews, isLoading } = useQuery({
    queryFn: () => fetchData("/reviews"),
    queryKey: ["reviews"],
  });

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <main
      id="top"
      className="bg-[#222] min-h-screen text-white pt-20 relative overflow-hidden"
    >
      <Section className="pb-80">
        <h1 className="text-3xl font-semibold mb-10 mt-5">All Reviews</h1>
        <Reviews reviews={reviews?.data} isLoading={isLoading} />
        <h1 className="text-3xl font-semibold mb-10 mt-5 flex gap-2 items-center">
          5 <Star h="24" w="24" />
          Reviews
        </h1>
        <Reviews
          reviews={reviews?.data?.filter((review) => review.rating === 5)}
          isLoading={isLoading}
        />
        <h1 className="text-3xl font-semibold mb-10 mt-5 flex gap-2 items-center">
          4 ½ <Star h="24" w="24" />
          Reviews
        </h1>
        <Reviews
          reviews={reviews?.data?.filter((review) => review.rating === 4.5)}
          isLoading={isLoading}
        />
        <h1 className="text-3xl font-semibold mb-10 mt-5 flex gap-2 items-center">
          4 <Star h="24" w="24" />
          Reviews
        </h1>
        <Reviews
          reviews={reviews?.data?.filter((review) => review.rating === 4)}
          isLoading={isLoading}
        />{" "}
        <h1 className="text-3xl font-semibold mb-10 mt-5 flex gap-2 items-center">
          3 ½ <Star h="24" w="24" />
          Reviews
        </h1>
        <Reviews
          reviews={reviews?.data?.filter((review) => review.rating === 3.5)}
          isLoading={isLoading}
        />{" "}
        <h1 className="text-3xl font-semibold mb-10 mt-5 flex gap-2 items-center">
          3 <Star h="24" w="24" />
          Reviews
        </h1>
        <Reviews
          reviews={reviews?.data?.filter((review) => review.rating === 3)}
          isLoading={isLoading}
        />{" "}
        <h1 className="text-3xl font-semibold mb-10 mt-5 flex gap-2 items-center">
          2 ½ <Star h="24" w="24" />
          Reviews
        </h1>
        <Reviews
          reviews={reviews?.data?.filter((review) => review.rating === 2.5)}
          isLoading={isLoading}
        />{" "}
        <h1 className="text-3xl font-semibold mb-10 mt-5 flex gap-2 items-center">
          2 <Star h="24" w="24" />
          Reviews
        </h1>
        <Reviews
          reviews={reviews?.data?.filter((review) => review.rating === 2)}
          isLoading={isLoading}
        />{" "}
        <h1 className="text-3xl font-semibold mb-10 mt-5 flex gap-2 items-center">
          1 ½ <Star h="24" w="24" />
          Reviews
        </h1>
        <Reviews
          reviews={reviews?.data?.filter((review) => review.rating === 1.5)}
          isLoading={isLoading}
        />{" "}
        <h1 className="text-3xl font-semibold mb-10 mt-5 flex gap-2 items-center">
          1 <Star h="24" w="24" />
          Reviews
        </h1>
        <Reviews
          reviews={reviews?.data?.filter((review) => review.rating === 1)}
          isLoading={isLoading}
        />
        <h1 className="text-3xl font-semibold mb-10 mt-5 flex gap-2 items-center">
          0 ½ <Star h="24" w="24" />
          Reviews
        </h1>{" "}
        <Reviews
          reviews={reviews?.data?.filter((review) => review.rating === 0.5)}
          isLoading={isLoading}
        />
      </Section>
    </main>
  );
}
