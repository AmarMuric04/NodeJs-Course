import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";
import Input from "../components/Input";
import { Filter } from "../assets/icons";
import { setNotification } from "../storage/notificationSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [showLiked, setShowLiked] = useState(false);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [fetchingInter, setFetchingInter] = useState(false);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const searchInput = useRef(null);
  const fnameInput = useRef(null);
  const lnameInput = useRef(null);
  const emailInput = useRef(null);
  const tagsInput = useRef(null);

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const handleGetPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/posts");
        if (!response.ok) {
          throw new Error("Error during fetch of posts.");
        }
        const data = await response.json();
        setPosts(data.posts);
        setFilteredPosts(data.posts);
      } catch (error) {
        console.error(error);
      }
    };
    handleGetPosts();
  }, []);

  useEffect(() => {
    const applyFilters = async () => {
      try {
        let updatedPosts = [...posts];

        if (searchTerm) {
          updatedPosts = updatedPosts.filter(
            (post) =>
              post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              post.content.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (searchInput.current) searchInput.current.value = "";
        }

        console.log(tags, fname, lname, email);
        if (tags || fname || lname || email) {
          updatedPosts = updatedPosts.filter((post) => {
            const matchesFname =
              !fname ||
              post.creator.fname.toLowerCase() === fname.toLowerCase();

            const matchesLname =
              !lname ||
              post.creator.lname.toLowerCase() === lname.toLowerCase();

            const matchesEmail =
              !email ||
              post.creator.email.toLowerCase() === email.toLowerCase();

            const matchesTags =
              tags.length === 0 ||
              tags
                .map((tag) => tag.toLowerCase())
                .sort()
                .every((tag, index) =>
                  post.tags
                    .map((postTag) => postTag.toLowerCase())
                    .sort()
                    .includes(tag)
                );

            console.log(matchesFname, matchesLname, matchesEmail, matchesTags);
            return matchesFname && matchesLname && matchesEmail && matchesTags;
          });

          console.log(updatedPosts);

          if (tagsInput.current) tagsInput.current.value = "";
          if (fnameInput.current) fnameInput.current.value = "";
          if (lnameInput.current) lnameInput.current.value = "";
          if (emailInput.current) emailInput.current.value = "";
        }

        if (filterBy) {
          const sortOptions = {
            likes: (a, b) => b.likes.length - a.likes.length,
            comments: (a, b) => b.comments.length - a.comments.length,
            views: (a, b) => b.views.length - a.views.length,
            bookmarks: (a, b) => b.bookmarks.length - a.bookmarks.length,
          };
          if (sortOptions[filterBy]) {
            updatedPosts.sort(sortOptions[filterBy]);
          }
        }

        if (timeFilter) {
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

          if (timeFilter === "latest" || timeFilter === "oldest") {
            updatedPosts.sort(timeOptions[timeFilter]);
          } else if (timeFilter === "24h" || timeFilter === "week") {
            updatedPosts = updatedPosts.filter(timeOptions[timeFilter]);
          }
        }

        if (showLiked || showBookmarked) {
          if (!user) {
            const error = new Error("Please sign in and try again.");
            dispatch(
              setNotification({ message: error.message, type: "error" })
            );
            setShowLiked(false);
            setShowBookmarked(false);
            throw error;
          }

          setSearchTerm("");

          const interactionType = showLiked ? "liked" : "bookmarked";
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

        setFilteredPosts(updatedPosts);
      } catch (error) {
        console.error("Error applying filters:", error.message);
      }
    };

    applyFilters();
  }, [
    dispatch,
    searchTerm,
    filterBy,
    timeFilter,
    posts,
    showLiked,
    showBookmarked,
    token,
    user,
    fname,
    lname,
    email,
    tags,
  ]);

  return (
    <main className="bg-[#222] text-white h-auto min-h-screen w-full flex">
      <section className="w-full flex justify-center">
        <div className="w-[75rem] text-white flex relative">
          <div className="w-2/3 mt-40">
            <h1 className="text-[3rem] font-semibold text-white">
              Create a post?
            </h1>
            <div className="ml-8 flex gap-4 items-center">
              <p className="text-xl text-gray-400">
                Share your thoughts with the community by creating a new post!
              </p>
              <Link to="/create-post">
                <button className="bg-purple-500 hover:bg-orange-500 text-white py-2 px-8 rounded-[2rem] hover:rounded-none transition-all font-semibold">
                  Create a Post
                </button>
              </Link>
            </div>
            <div className="w-full h-[1px] bg-[#191919] my-8"></div>
            <h1 className="text-[3rem] font-semibold text-white mb-10">Feed</h1>
            {searchTerm && filteredPosts?.length === 0 && (
              <>
                <p className="font-semibold text-lg text-gray-300">
                  No posts found for your search...
                </p>
                <p className="mb-8 text-gray-500">
                  Displaying other posts from users.
                </p>
              </>
            )}
            {!fetchingInter && showLiked && filteredPosts?.length === 0 && (
              <>
                <p className="font-semibold text-lg text-gray-300">
                  You didn't like any posts...
                </p>
                <p className="mb-8 text-gray-500">
                  Displaying other posts from users.
                </p>
              </>
            )}
            {!fetchingInter &&
              showBookmarked &&
              filteredPosts?.length === 0 && (
                <>
                  <p className="font-semibold text-lg text-gray-300">
                    You didn't bookmark any posts
                  </p>
                  <p className="mb-8 text-gray-500">
                    Displaying other posts from users.
                  </p>
                </>
              )}
            {filteredPosts?.length > 0 ? (
              <div>
                {filteredPosts.map((post) => (
                  <Post key={post._id} post={post} />
                ))}
              </div>
            ) : (
              posts && (
                <div>
                  {posts.map((post) => (
                    <Post key={post._id} post={post} />
                  ))}
                </div>
              )
            )}
          </div>
          <div className="w-1/3 h-screen bg-[#191919] sticky right-0 top-0 z-40 pt-40 px-4">
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
                setSearchTerm(searchInput.current.value);
                setShowBookmarked(false);
                setShowLiked(false);
              }}
              className="px-4 py-2 bg-purple-500 hover:bg-orange-500 w-full transition-all rounded-[2rem] hover:rounded-none font-semibold"
            >
              Search
            </button>
            <div className="flex items-end justify-between text-gray-300 mt-10">
              <h1 className="text-xl">Filter</h1>
              <Filter />
            </div>
            <div className="filters flex gap-4 mb-6 flex-col mt-8">
              <select
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-4 py-2 rounded-md bg-[#222] text-white cursor-pointer"
              >
                <option value="">Sort By Values</option>
                <option value="likes">Most Liked</option>
                <option value="bookmarked">Most Bookmarked</option>
                <option value="comments">Most Commented</option>
                <option value="views">Most Viewed</option>
              </select>

              <select
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 rounded-md bg-[#222] text-white cursor-pointer"
              >
                <option value="">Sort By Time</option>
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="24h">Last 24 Hours</option>
                <option value="week">Last Week</option>
              </select>
              <div className="flex justify-between items-center">
                <label className="flex gap-2 items-center text-gray-300">
                  <input
                    type="checkbox"
                    checked={showLiked}
                    onChange={() => {
                      setShowLiked(!showLiked);
                      setShowBookmarked(false);
                      setSearchTerm("");
                    }}
                  />
                  <p>Show liked posts</p>
                </label>
              </div>
              <div className="flex justify-between items-center">
                <label className="text-gray-300 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={showBookmarked}
                    onChange={() => {
                      setShowBookmarked(!showBookmarked);
                      setShowLiked(false);
                      setSearchTerm("");
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
                    setFname(fnameInput.current.value);
                    setLname(lnameInput.current.value);
                    setEmail(emailInput.current.value);
                    setTags(
                      tagsInput.current.value
                        .split(",")
                        .map((e) => e.trim())
                        .filter((e) => e !== "")
                    );

                    setShowBookmarked(false);
                    setShowLiked(false);
                    setSearchTerm("");
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
