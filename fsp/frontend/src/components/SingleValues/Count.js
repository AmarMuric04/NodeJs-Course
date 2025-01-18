import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utility/async";
import { Spinner } from "../../assets/icons";
import { useIntersectionObserver } from "../../utility/hooks";

export default function Count({ URL }) {
  const [ref, isVisible] = useIntersectionObserver({
    root: null,
    rootMargin: "200px",
    threshold: 0,
  });

  const { data, isLoading, isError } = useQuery({
    queryFn: () => fetchData(URL),
    queryKey: ["data", ...URL.split("/").filter(Boolean)],
    enabled: !!URL && isVisible,
    staleTime: Infinity,
  });

  if (!URL) return <p>URL is required</p>;
  if (isLoading) return <Spinner />;
  if (isError) return <>?</>;
  return <p ref={ref}>{data?.data || 0}</p>;
}
