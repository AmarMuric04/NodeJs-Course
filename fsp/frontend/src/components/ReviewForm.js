import Input from "./Input";
import { Link } from "react-router-dom";
import { StarRating } from "./StarRating";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../storage/notificationSlice";
import { Spinner } from "../assets/icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postData } from "../utility/async";

const ReviewForm = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [isActive, setIsActive] = useState("anon");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const { mutate: addReview, isPending } = useMutation({
    mutationFn: () => {
      let body = { message, rating };
      if (isActive === "anon") body = { ...body, anonymous: true };
      else if (isActive === "profile")
        body = {
          ...body,
          user: user._id,
          anonymous: false,
        };

      return postData("http://localhost:8080/reviews", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onError: (error) => {
      if (error.status === 409) dispatch(setNotification(error));
      setError(error);
      setTimeout(() => {
        setError(false);
      }, 3000);
    },
    onSuccess: () => {
      dispatch(setNotification({ message: "Added a review!" }));
      queryClient.invalidateQueries(["reviews"]);

      setMessage("");
      setRating(0);
    },
    mutationKey: ["review"],
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addReview();
      }}
      className="bg-[#141414] w-full h-full p-8 rounded-xl shadow-md flex flex-col justify-between"
    >
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setIsActive("anon")}
          className={`font-semibold hover:bg-orange-500 transition-all rounded-md py-2 w-1/2 ${
            isActive === "anon" ? " bg-orange-500" : "bg-purple-500"
          }`}
        >
          Anonymous
        </button>
        {isAuth && user ? (
          <button
            type="button"
            onClick={() => setIsActive("profile")}
            className={`font-semibold hover:bg-orange-500 transition-all rounded-md py-2 w-1/2 ${
              isActive === "profile" ? " bg-orange-500" : "bg-purple-500"
            }`}
          >
            Review as {user.fname}
          </button>
        ) : (
          <Link
            className={`font-semibold text-center bg-purple-500 hover:bg-orange-500 transition-all rounded-md py-2 w-1/2 ${
              isActive === "profile" && " bg-orange-500"
            }`}
            to="/signin"
          >
            Sign in & review
          </Link>
        )}
      </div>

      <div className="flex flex-col items-center gap-2 justify-center my-4">
        <StarRating rating={rating} setRating={setRating} stars={5} />
        {error?.data?.find((err) => err.path === "rating") && (
          <div className="text-red-600 text-xs flex items-center gap-1 mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07m12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32M9 5h2v6H9zm0 8h2v2H9z"
              />
            </svg>
            <p>{error?.data?.find((err) => err.path === "rating").msg}</p>
          </div>
        )}
      </div>

      <Input
        error={error}
        type="text"
        input="textarea"
        extraClasses="border-2 text-white w-full py-2 px-4 rounded-lg mt-1 mb"
        normalClass="bg-[#222] border-[#101010]"
        onErrorClass="border-red-600 bg-[#222]"
        placeholder="Your feedback..."
        name="message"
        label="The Review"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        disabled={isPending || error}
        className="bg-purple-500 font-semibold hover:bg-orange-500 transition-all py-4 rounded-[2rem] hover:rounded-none my-4"
      >
        {isPending ? (
          <div className="flex items-center gap-2 justify-center">
            <p>Submitting...</p>
            <Spinner />
          </div>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
};

export default ReviewForm;
