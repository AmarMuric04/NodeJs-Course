import { useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Post from "../components/Post";
import Input from "../components/Input";
import { Filter } from "../assets/icons";
import { setNotification } from "../storage/notificationSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Feed() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const [count, setCount] = useState(0);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [fetchingInter, setFetchingInter] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    liked: false,
    bookmarked: false,
    fname: "",
    lname: "",
    email: "",
    tags: null,
    select: "",
    time: "",
    filtering: false,
  });

  const page = parseInt(searchParams.get("page")) || 1;

  const handlePageChange = (newPage) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("page", newPage);
    setSearchParams(updatedParams);
  };

  const { user } = useSelector((state) => state.auth);
  const searchInput = useRef(null);
  const fnameInput = useRef(null);
  const lnameInput = useRef(null);
  const emailInput = useRef(null);
  const tagsInput = useRef(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isFetchingRef.current) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (docHeight - (scrollTop + windowHeight) <= 50) {
        if (count > page * 5) {
          isFetchingRef.current = true;
          handlePageChange(page + 1);
          dispatch(setNotification({ message: "Loading more posts" }));

          setTimeout(() => {
            isFetchingRef.current = false;
          }, 1000);
        }
      }
    };

    const throttledScroll = () => requestAnimationFrame(handleScroll);

    window.addEventListener("scroll", throttledScroll);

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [count, page, dispatch, handlePageChange]);

  const token = localStorage.getItem("token");
  const handleGetPosts = async () => {
    try {
      const response = await fetch("http://localhost:8080/posts?page=" + page);
      if (!response.ok) {
        throw new Error("Error during fetch of posts.");
      }

      const data = await response.json();
      setPosts(data.posts);
      setCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("Render");

  useEffect(() => {
    handleGetPosts();
  }, [page]);

  useEffect(() => {
    if (posts.length === 0) return;
    const applyFilters = async () => {
      try {
        let updatedPosts = [...posts];

        if (filters.liked || filters.bookmarked) {
          if (!user) {
            const error = new Error("Please sign in and try again.");
            dispatch(
              setNotification({ message: error.message, type: "error" })
            );
            throw error;
          }

          const interactionType = filters.liked ? "liked" : "bookmarked";
          setFetchingInter(true);
          const response = await fetch(
            `http://localhost:8080/users/${user._id}/${interactionType}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            dispatch(
              setNotification({ message: errorData.message, type: "error" })
            );
            throw new Error(errorData.message);
          }

          const data = await response.json();
          updatedPosts = data.posts || [];
          setFetchingInter(false);
        }

        if (filters.search) {
          updatedPosts = updatedPosts.filter(
            (post) =>
              post.title.toLowerCase().includes(filters.search.toLowerCase()) ||
              post.content.toLowerCase().includes(filters.search.toLowerCase())
          );
        }

        if (filters.tags || filters.fname || filters.lname || filters.email) {
          updatedPosts = updatedPosts.filter((post) => {
            const matchesFname =
              !filters.fname ||
              post.creator.fname.toLowerCase() === filters.fname.toLowerCase();

            const matchesLname =
              !filters.lname ||
              post.creator.lname.toLowerCase() === filters.lname.toLowerCase();

            const matchesEmail =
              !filters.email ||
              post.creator.email.toLowerCase() === filters.email.toLowerCase();

            const matchesTags =
              filters.tags.length === 0 ||
              filters.tags
                .map((tag) => tag.toLowerCase())
                .sort()
                .every((tag) =>
                  post.tags
                    .map((postTag) => postTag.toLowerCase())
                    .sort()
                    .includes(tag)
                );

            return matchesFname && matchesLname && matchesEmail && matchesTags;
          });
        }

        if (filters.select) {
          const sortOptions = {
            likes: (a, b) => b.likes.length - a.likes.length,
            comments: (a, b) => b.comments.length - a.comments.length,
            views: (a, b) => b.views.length - a.views.length,
            bookmarks: (a, b) => b.bookmarks.length - a.bookmarks.length,
          };
          if (sortOptions[filters.select]) {
            updatedPosts.sort(sortOptions[filters.select]);
          }
        }

        if (filters.time) {
          const now = new Date().getTime();
          const timeOptions = {
            latest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
            oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            "24h": (post) =>
              new Date(post.createdAt).getTime() >= now - 24 * 60 * 60 * 1000,
            week: (post) =>
              new Date(post.createdAt).getTime() >=
              now - 7 * 24 * 60 * 60 * 1000,
          };

          if (filters.time === "latest" || filters.time === "oldest") {
            updatedPosts.sort(timeOptions[filters.time]);
          } else if (filters.time === "24h" || filters.time === "week") {
            updatedPosts = updatedPosts.filter(timeOptions[filters.time]);
          }
        }

        setFilteredPosts(updatedPosts);
      } catch (error) {
        console.error("Error applying filters:", error.message);
      }
    };

    applyFilters();
  }, [filters, dispatch, posts, token, user]);

  const handleInteraction = async (postId, interactionType) => {
    setFetchingInter(true);
    try {
      const response = await fetch(
        `http://localhost:8080/posts/${postId}/${interactionType}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Please sign in and try again.");
      await handleGetPosts();
    } catch (error) {
      console.error(error);
      dispatch(setNotification({ message: error.message, type: "error" }));
    } finally {
      setFetchingInter(false);
    }
  };

  return (
    <main className="bg-[#222] text-white h-auto min-h-screen w-full flex">
      <section className="w-full flex justify-center">
        <div className="w-[75rem] text-white flex gap-8 relative">
          <div className="w-2/3 mt-40">
            <h1 className="text-[3rem] font-semibold text-white">
              Create a post?
            </h1>
            <div className="ml-8 flex flex-col gap-4">
              <p className="text-xl text-gray-400">
                Share your thoughts with the community by creating a new post!
              </p>
              <Link to="/create-post">
                <button className="bg-white bg-opacity-5 hover:bg-white hover:bg-opacity-10 text-white py-2 px-8 rounded-[2rem] hover:rounded-none transition-all font-semibold">
                  Create a Post
                </button>
              </Link>
            </div>
            <div className="w-full h-[1px] bg-[#191919] my-8"></div>
            <h1 className="text-[3rem] font-semibold text-white mb-10">Feed</h1>
            {filters.filtering &&
              !fetchingInter &&
              filteredPosts.length === 0 && (
                <>
                  <p className="font-semibold text-lg text-gray-300">
                    No posts found under your filters.
                  </p>
                  <p className="mb-8 text-gray-500">
                    Displaying other posts from users.
                  </p>
                </>
              )}
            {filteredPosts?.length > 0 ? (
              <div>
                {filteredPosts.map((post) => (
                  <Post
                    onLike={() => handleInteraction(post._id, "like")}
                    onBookmark={() => handleInteraction(post._id, "bookmark")}
                    key={post._id}
                    post={post}
                  />
                ))}
              </div>
            ) : (
              posts && (
                <div>
                  {posts.map((post) => (
                    <Post
                      onLike={() => handleInteraction(post._id, "like")}
                      onBookmark={() => handleInteraction(post._id, "bookmark")}
                      key={post._id}
                      post={post}
                    />
                  ))}
                </div>
              )
            )}
          </div>

          <div className="w-1/3 h-screen bg-[#191919] sticky right-0 top-0 z-40 pt-40 px-4 shadow-xl ">
            <div className="flex items-end justify-between text-gray-300 mt-10 mb-4">
              <h1 className="text-xl">Search</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
                />
              </svg>
            </div>
            <Input
              type="text"
              input="input"
              placeholder="Search by title or content..."
              name="fname"
              normalClass="bg-[#222] border-[#222] text-white"
              ref={searchInput}
            />
            <button
              onClick={() => {
                setFilters((prevFilters) => {
                  return {
                    ...prevFilters,
                    search: searchInput.current.value,
                    filtering: true,
                  };
                });
              }}
              className="px-4 py-2 bg-purple-500 hover:bg-orange-500 w-full transition-all rounded-[2rem] hover:rounded-none font-semibold"
            >
              Search
            </button>
            <div className="flex items-end justify-between text-gray-300 mt-10">
              <h1 className="text-xl">Sort</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h4q.425 0 .713.288T9 17t-.288.713T8 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h10q.425 0 .713.288T15 12t-.288.713T14 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              <select
                value={filters.select}
                onChange={(e) =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    select: e.target.value,
                    time: "",
                    filtering: true,
                  }))
                }
                className={`px-4 py-2 rounded-md text-white cursor-pointer appearance-none ${
                  filters.select !== "" ? "bg-purple-500" : "bg-[#222]"
                }`}
              >
                <option className="bg-[#222]" value="">
                  Sort By Values
                </option>
                <option className="bg-[#222]" value="likes">
                  Most Liked
                </option>
                <option className="bg-[#222]" value="bookmarks">
                  Most Bookmarked
                </option>
                <option className="bg-[#222]" value="comments">
                  Most Commented
                </option>
                <option className="bg-[#222]" value="views">
                  Most Viewed
                </option>
              </select>

              <select
                value={filters.time}
                onChange={(e) =>
                  setFilters((prevFilters) => ({
                    ...prevFilters,
                    select: "",
                    time: e.target.value,
                    filtering: true,
                  }))
                }
                className={`px-4 py-2 rounded-md text-white cursor-pointer appearance-none ${
                  filters.time !== "" ? "bg-purple-500" : "bg-[#222]"
                }`}
              >
                <option className="bg-[#222]" value="">
                  Sort By Time
                </option>
                <option className="bg-[#222]" value="latest">
                  Latest
                </option>
                <option className="bg-[#222]" value="oldest">
                  Oldest
                </option>
                <option className="bg-[#222]" value="24h">
                  Last 24 Hours
                </option>
                <option className="bg-[#222]" value="week">
                  Last Week
                </option>
              </select>
            </div>
            <div className="filters flex gap-4 mb-6 flex-col mt-8">
              <div className="flex items-end justify-between text-gray-300 mt-4">
                <h1 className="text-xl">Filter</h1>
                <Filter />
              </div>
              <div className="flex justify-between items-center">
                <label className="flex gap-2 items-center text-gray-300">
                  <input
                    type="checkbox"
                    checked={filters.liked}
                    onChange={() => {
                      if (!user)
                        dispatch(
                          setNotification({
                            message: "Please sign in and try again!",
                          })
                        );
                      else
                        setFilters((prevFilters) => {
                          return {
                            ...prevFilters,
                            bookmarked: false,
                            liked: !prevFilters.liked,
                            filtering: true,
                          };
                        });
                    }}
                  />
                  <p>Show liked posts</p>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <label className="text-gray-300 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.bookmarked}
                    onChange={() => {
                      if (!user)
                        dispatch(
                          setNotification({
                            message: "Please sign in and try again!",
                          })
                        );
                      else
                        setFilters((prevFilters) => {
                          return {
                            ...prevFilters,
                            bookmarked: !prevFilters.bookmarked,
                            liked: false,
                            filtering: true,
                          };
                        });
                    }}
                  />
                  <p>Show bookmarked posts</p>
                </label>
              </div>
              <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 justify-center text-gray-300 hover:bg-white hover:bg-opacity-10 py-2 transition-all cursor-pointer rounded-md"
              >
                {isExpanded ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1"
                      />
                    </svg>
                    <p>Hide custom filter</p>
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokelinecup="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v14m-7-7h14"
                      />
                    </svg>
                    <p>Add a custom filter</p>
                  </>
                )}
              </div>
              <div
                className={`transition-all duration-500 overflow-hidden p-1 ${
                  isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex gap-4">
                  <Input
                    type="text"
                    input="input"
                    placeholder="User's first name"
                    normalClass="bg-[#222] border-[#222] text-white"
                    ref={fnameInput}
                  />
                  <Input
                    type="text"
                    input="input"
                    placeholder="User's last name"
                    normalClass="bg-[#222] border-[#222] text-white"
                    ref={lnameInput}
                  />
                </div>
                <Input
                  type="text"
                  input="input"
                  placeholder="User's email"
                  normalClass="bg-[#222] border-[#222] text-white"
                  ref={emailInput}
                />
                <div className="flex flex-col">
                  <Input
                    type="text"
                    input="input"
                    placeholder="Tags"
                    normalClass="bg-[#222] border-[#222] text-white"
                    ref={tagsInput}
                  />
                  <div className="-mt-2 flex items-center gap-1 text-xs text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                      />
                    </svg>
                    <p>Seperate tags with a comma.</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFilters((prevFilters) => {
                      return {
                        ...prevFilters,
                        fname: fnameInput.current.value,
                        lname: lnameInput.current.value,
                        email: emailInput.current.value,
                        tags: tagsInput.current.value
                          .split(",")
                          .map((e) => e.trim())
                          .filter((e) => e !== ""),
                        filtering: true,
                      };
                    });
                  }}
                  className="px-4 py-2 bg-purple-500 hover:bg-orange-500 w-full transition-all rounded-[2rem] hover:rounded-none font-semibold mt-4"
                >
                  Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
