import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utility/async";
import { Spinner } from "../../assets/icons";
import { useIntersectionObserver } from "../../utility/hooks";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";

const socket = io(process.env.REACT_APP_SERVER_PORT);

export default function Count({ URL, id }) {
  const [ref, isVisible] = useIntersectionObserver({
    root: null,
    rootMargin: "200px",
    threshold: 0,
  });

  const [realTimeValue, setRealTimeValue] = useState(null);
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useQuery({
    queryFn: () => fetchData(URL),
    queryKey: ["data", ...URL.split("/").filter(Boolean)],
    enabled: !!URL && isVisible,
    staleTime: Infinity,
  });
  useEffect(() => {
    if (!URL) return;
    socket.on("updateStats", (updates) => {
      const keys = Object.keys(updates);
      if (!keys.some((key) => key === id)) return;
      setRealTimeValue(updates[id]);
    });

    return () => {
      socket.off("updateStats");
    };
  }, [URL, id, dispatch]);

  if (!URL) return <p>URL is required</p>;
  if (isLoading) return <Spinner />;
  if (isError) return <>?</>;
  return <p ref={ref}>{realTimeValue ?? data?.data ?? 0}</p>;
}
