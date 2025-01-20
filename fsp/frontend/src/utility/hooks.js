import { useMutation, useQueryClient } from "@tanstack/react-query";
import { protectedPostData } from "./async";
import { setNotification } from "../storage/notificationSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";

export const useIntersectionObserver = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
};

export const usePostInteraction = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const { mutate } = useMutation({
    mutationFn: ({ postId, interactionType }) => {
      return protectedPostData(
        `/posts/${postId}/${interactionType}`,
        null,
        token
      );
    },
    onError: (error) => {
      dispatch(setNotification(error.data));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return { handleInteraction: mutate };
};
