import { useState, useEffect } from "react";
import { Comment, Like, Bookmark, Bookmarked, Liked } from "../assets/icons";
import { formatTime } from "../utility/util";
import { useSelector } from "react-redux";
import { useIntersectionObserver } from "../utility/hooks";
import FadeIn from "./FadeIn";
import { Link } from "react-router-dom";

export default function Post({
  post,
  onBookmark,
  onLike,
  isLikePending,
  isBookmarkPending,
}) {
  const { user } = useSelector((state) => state.auth);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const token = localStorage.getItem("token");

  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.5,
  });

  const [hasCountedView, setHasCountedView] = useState(false);

  useEffect(() => {
    if (!user) {
      setLiked(false);
      setBookmarked(false);
      return;
    }
    setLiked(post.likes.includes(user._id));
    setBookmarked(post.bookmarks.includes(user._id));
  }, [post.likes, post.bookmarks, user]);

  useEffect(() => {
    const countView = async () => {
      if (isVisible && !hasCountedView) {
        try {
          await fetch(`http://localhost:8080/posts/${post._id}/view`, {
            method: "POST",
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          setHasCountedView(true);
        } catch (error) {
          console.error("Error updating view count:", error);
        }
      }
    };

    countView();
  }, [isVisible, hasCountedView, post._id, token]);

  const handleAction = async (action) => {
    if (action === "like") {
      onLike();
    }
    if (action === "bookmark") {
      onBookmark();
    }
  };

  return (
    <FadeIn>
      <div
        ref={ref}
        className="flex overflow-y-hidden gap-4 transition duration-500 bg-[#191919] p-10 rounded-3xl shadow-xl my-10"
      >
        <Link
          className="min-w-[3rem] max-w-[3rem] h-[3rem] rounded-full object-cover"
          to={`/profile/${post.creator.slug}`}
        >
          <img
            className="w-full h-full rounded-full object-cover"
            src={`http://localhost:8080/${post.creator.imageUrl}`}
            alt="User's pfp"
          />
        </Link>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <Link
              className="hover:underline flex gap-2 items-center"
              to={`/profile/${post.creator.slug}`}
            >
              <p className="text-sm font-bold">
                {post.creator.fname}, {post.creator.lname}{" "}
              </p>
              <div className="flex gap-1 items-center">
                {post.creator.verified === "true" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="text-purple-500"
                  >
                    <path
                      fill="currentColor"
                      d="m8.6 22.5l-1.9-3.2l-3.6-.8l.35-3.7L1 12l2.45-2.8l-.35-3.7l3.6-.8l1.9-3.2L12 2.95l3.4-1.45l1.9 3.2l3.6.8l-.35 3.7L23 12l-2.45 2.8l.35 3.7l-3.6.8l-1.9 3.2l-3.4-1.45zm2.35-6.95L16.6 9.9l-1.4-1.45l-4.25 4.25l-2.15-2.1L7.4 12z"
                    />
                  </svg>
                )}
                {post.creator.status === "admin" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="text-purple-500"
                  >
                    <path
                      fill="currentColor"
                      d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5Zm0 3.9a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0 7.9c2 0 6 1.09 6 3.08a7.2 7.2 0 0 1-12 0c0-1.99 4-3.08 6-3.08"
                    />
                  </svg>
                )}
              </div>
            </Link>
            <p className="text-gray-400 text-sm">{post.creator.email}</p>
            <p>·</p>
            <p className="text-gray-400 text-sm">
              {formatTime(post.createdAt)} ago
            </p>
          </div>
          {post.imageUrl ? (
            <div className="flex gap-[5%]">
              <div className="w-[65%]">
                <p className="text-xl font-bold">{post.title}</p>
                <p className="mb-4">{post.content}</p>
                <div className="flex">
                  <div>
                    <img
                      className="rounded-lg"
                      src={`http://localhost:8080/${post.imageUrl}`}
                      alt="Post"
                    />
                    <div className="flex gap-20 items-center text-gray-400 text-xs mt-4">
                      <div className="flex items-center gap-2 cursor-pointer hover:scale-125 transition-all">
                        <Comment className="hover:text-orange-500 transition-all" />
                        <p>0</p>
                      </div>
                      <button
                        disabled={isLikePending}
                        onClick={() => handleAction("like")}
                        className="flex items-center gap-2 cursor-pointer hover:scale-125 transition-all"
                      >
                        <div className="hover:text-orange-500 transition-all">
                          {!liked ? (
                            <Like />
                          ) : (
                            <Liked className="jump text-purple-500 hover:text-orange-500 transition-all" />
                          )}
                        </div>
                        <p>{post.likes.length}</p>
                      </button>

                      <button
                        disabled={isBookmarkPending}
                        onClick={() => handleAction("bookmark")}
                        className="flex items-center gap-2 cursor-pointer hover:scale-125 transition-all"
                      >
                        <div className="hover:text-orange-500 transition-all">
                          {!bookmarked ? (
                            <Bookmark />
                          ) : (
                            <Bookmarked className="jump-bookmark text-purple-500 hover:text-orange-500 transition-all" />
                          )}
                        </div>
                        <p>{post.bookmarks.length}</p>
                      </button>
                      <div className="flex items-center gap-2 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 32 32"
                        >
                          <path
                            fill="currentColor"
                            d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25"
                          />
                          <path
                            fill="currentColor"
                            d="M16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6m0 10a4 4 0 1 1 4-4a4 4 0 0 1-4 4"
                          />
                        </svg>
                        <p>{post.views.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-8 items-start w-[30%]">
                <div>
                  <h1 className="font-semibold text-lg text-gray-300">
                    Location:
                  </h1>
                  <p className="text-sm text-gray-400">
                    {post.location ? post.location : "Location not provided."}
                  </p>
                </div>
                <div>
                  <h1 className="font-semibold text-lg">Date:</h1>
                  <p className="text-sm text-gray-400">
                    {post.date ? post.date : "Date not provided."}
                  </p>
                </div>
                <div>
                  <h1 className="font-semibold text-lg text-gray-300">Tags:</h1>
                  <div className="text-sm text-gray-400 flex gap-2 flex-wrap">
                    {post.tags.length > 0
                      ? post.tags.map((tag) => <p key={tag}>#{tag}</p>)
                      : "No tags."}
                  </div>
                </div>
                <div>
                  <h1 className="font-semibold text-lg text-gray-300">
                    Links:
                  </h1>
                  <p className="text-sm text-gray-400 flex gap-2 flex-wrap">
                    {post.links.length > 0
                      ? post.links.map((link) => (
                          <a
                            key={link}
                            rel="noreferrer"
                            target="_blank"
                            className="underline hover:text-purple-500 transition-all max-w-[3rem] overflow-hidden text-ellipsis whitespace-nowrap"
                            href={link}
                          >
                            {link}
                          </a>
                        ))
                      : "No links."}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full">
                <p className="text-xl font-bold">{post.title}</p>
                <p className="mb-4">{post.content}</p>
                <div className="flex gap-8 items-start w-full">
                  <div>
                    <h1 className="font-semibold text-lg text-gray-300">
                      Location:
                    </h1>
                    <p className="text-sm text-gray-400">
                      {post.location ? post.location : "Location not provided."}
                    </p>
                  </div>
                  <div>
                    <h1 className="font-semibold text-lg">Date:</h1>
                    <p className="text-sm text-gray-400">
                      {post.date ? post.date : "Date not provided."}
                    </p>
                  </div>
                  <div>
                    <h1 className="font-semibold text-lg text-gray-300">
                      Tags:
                    </h1>
                    <div className="text-sm text-gray-400 flex gap-2 flex-wrap">
                      {post.tags.length > 0
                        ? post.tags.map((tag) => <p key={tag}>#{tag}</p>)
                        : "No tags."}
                    </div>
                  </div>
                  <div>
                    <h1 className="font-semibold text-lg text-gray-300">
                      Links:
                    </h1>
                    <p className="text-sm text-gray-400 flex gap-2 flex-wrap">
                      {post.links.length > 0
                        ? post.links.map((link) => (
                            <a
                              key={link}
                              rel="noreferrer"
                              target="_blank"
                              className="underline hover:text-purple-500 transition-all max-w-[3rem] overflow-hidden text-ellipsis whitespace-nowrap"
                              href={link}
                            >
                              {link}
                            </a>
                          ))
                        : "No links."}
                    </p>
                  </div>
                </div>
                <div className="flex gap-20 items-center text-gray-400 text-xs mt-4">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Comment className="hover:text-orange-500 transition-all" />
                    <p>0</p>
                  </div>
                  <button
                    disabled={isLikePending}
                    onClick={() => handleAction("like")}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="hover:text-orange-500 transition-all">
                      {!liked ? (
                        <Like />
                      ) : (
                        <Liked className="text-purple-500 hover:text-orange-500 transition-all" />
                      )}
                    </div>
                    <p>{post.likes.length}</p>
                  </button>

                  <button
                    disabled={isBookmarkPending}
                    onClick={() => handleAction("bookmark")}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="hover:text-orange-500 transition-all">
                      {!bookmarked ? (
                        <Bookmark />
                      ) : (
                        <Bookmarked className="text-purple-500 hover:text-orange-500 transition-all" />
                      )}
                    </div>
                    <p>{post.bookmarks.length}</p>
                  </button>
                  <div className="flex items-center gap-2 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="currentColor"
                        d="M30.94 15.66A16.69 16.69 0 0 0 16 5A16.69 16.69 0 0 0 1.06 15.66a1 1 0 0 0 0 .68A16.69 16.69 0 0 0 16 27a16.69 16.69 0 0 0 14.94-10.66a1 1 0 0 0 0-.68M16 25c-5.3 0-10.9-3.93-12.93-9C5.1 10.93 10.7 7 16 7s10.9 3.93 12.93 9C26.9 21.07 21.3 25 16 25"
                      />
                      <path
                        fill="currentColor"
                        d="M16 10a6 6 0 1 0 6 6a6 6 0 0 0-6-6m0 10a4 4 0 1 1 4-4a4 4 0 0 1-4 4"
                      />
                    </svg>
                    <p>{post.views.length}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </FadeIn>
  );
}
