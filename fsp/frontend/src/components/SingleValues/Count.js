import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchData } from "../../utility/async";
import { Spinner } from "../../assets/icons";
import { useIntersectionObserver } from "../../utility/hooks";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

export default function Count({ URL, id }) {
  const [ref, isVisible] = useIntersectionObserver({
    root: null,
    rootMargin: "200px",
    threshold: 0,
  });

  const queryClient = useQueryClient();
  const [realTimeValue, setRealTimeValue] = useState(null);
  const { data, isLoading, isError } = useQuery({
    queryFn: () => fetchData(URL),
    queryKey: ["data", ...URL.split("/").filter(Boolean)],
    enabled: !!URL && isVisible,
    staleTime: Infinity,
  });
  useEffect(() => {
    if (!URL) return;
    socket.on("updateStats", (updates) => {
      const key = Object.keys(updates)[0];
      if (id !== key) return;
      setRealTimeValue(Object.values(updates)[0]);
    });

    return () => {
      socket.off("updateStats");
    };
  }, [URL, queryClient, id]);

  if (!URL) return <p>URL is required</p>;
  if (isLoading) return <Spinner />;
  if (isError) return <>?</>;
  return <p ref={ref}>{realTimeValue ?? data?.data ?? 0}</p>;
}
