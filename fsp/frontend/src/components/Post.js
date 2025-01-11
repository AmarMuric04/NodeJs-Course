import { useState, useEffect } from "react";
import { Comment, Like, Bookmark, Bookmarked, Liked } from "../assets/icons";
import { formatTime } from "../utility/util";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../storage/notificationSlice";

export default function Post({ post }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [bookmarks, setBookmarks] = useState(post.bookmarks.length);
  const [likes, setLikes] = useState(post.likes.length);

  const [disableB, setDisableB] = useState(false);
  const [disableL, setDisableL] = useState(false);

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) {
      setLiked(false);
      setBookmarked(false);

      return;
    }
    if (post.likes.includes(user._id)) {
      setLiked(true);
    }
    if (post.bookmarks.includes(user._id)) {
      setBookmarked(true);
    }
  }, [post.likes, post.bookmarks, user]);

  const handleAction = async (action, cb, toggleState) => {
    console.log("trying to like");

    if (action === "like") setDisableL(true);
    if (action === "bookmark") setDisableB(true);

    let URL = `http://localhost:8080/posts/${post._id}/${action}`;

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setTimeout(() => {
        if (action === "like") setDisableL(false);
        if (action === "bookmark") setDisableB(false);
      }, 1500);

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        dispatch(setNotification(error));
      }

      const data = await response.json();

      cb(data[action + "s"].length);
      toggleState((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex gap-4">
        <img
          className="w-[3rem] h-[3rem] rounded-full object-cover"
          src={`http://localhost:8080/${post.creator.imageUrl}`}
          alt="User's pfp"
        />
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <p className="text-sm font-bold">
              {post.creator.fname}, {post.creator.lname}{" "}
            </p>
            <p className="text-gray-400 text-sm">{post.creator.email}</p>
            <p>·</p>
            <p className="text-gray-400 text-sm">
              {formatTime(post.createdAt)} ago
            </p>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-1">
              <p className="text-xl font-bold w-[45%]">{post.title}</p>
              <p className="w-[45%] mb-8">{post.content}</p>
              <div className="flex">
                <div className="w-[45%] mr-[5%]">
                  {post.imageUrl && (
                    <img
                      className="rounded-lg"
                      src={`http://localhost:8080/${post.imageUrl}`}
                      alt="Post"
                    />
                  )}
                  <div className="flex gap-20 items-center text-gray-400 text-xs mt-4">
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Comment className="hover:text-orange-500 transition-all" />
                      <p>0</p>
                    </div>
                    <button
                      disabled={disableL}
                      onClick={() => handleAction("like", setLikes, setLiked)}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="hover:text-orange-500 transition-all">
                        {!liked ? (
                          <Like />
                        ) : (
                          <Liked className="text-purple-500 hover:text-orange-500 transition-all" />
                        )}
                      </div>
                      <p>{likes}</p>
                    </button>

                    <button
                      disabled={disableB}
                      onClick={() =>
                        handleAction("bookmark", setBookmarks, setBookmarked)
                      }
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div className="hover:text-orange-500 transition-all">
                        {!bookmarked ? (
                          <Bookmark />
                        ) : (
                          <Bookmarked className="text-purple-500 hover:text-orange-500 transition-all" />
                        )}
                      </div>
                      <p>{bookmarks}</p>
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-8 items-start w-[45%]">
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
                              className="underline hover:text-purple-500 transition-all"
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
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#191919] h-[1px] w-full my-10"></div>
    </>
  );
}
