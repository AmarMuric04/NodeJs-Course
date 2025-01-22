import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchData, protectedPostData } from "../utility/async";
import Section from "../components/Section";
import { useDispatch, useSelector } from "react-redux";
import Post from "../components/Post";
import { usePostInteraction } from "../utility/hooks";
import { formatDate } from "../utility/util";
import { useEffect, useState } from "react";
import { setNotification } from "../storage/notificationSlice";
import { useQueryClient } from "@tanstack/react-query";
import { Modal } from "../components/Modal";

export function Profile() {
  const [showCategory, setShowCategory] = useState("posts");
  const [isFollowing, setIsFollowing] = useState(false);
  const [modalType, setModalType] = useState(null);

  const { slug } = useParams();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { handleInteraction } = usePostInteraction();
  const token = localStorage.getItem("token");

  const { data: fetchedUser, isLoading } = useQuery({
    queryFn: () => fetchData("/users/profile/" + slug),
    queryKey: ["profile", slug],
  });

  const { data: currentUser } = useQuery({
    queryFn: () => fetchData("/users/" + user?._id),
    queryKey: ["user"],
    enabled: !!user,
  });

  const { data: fetchedPosts, isLoading: postsIsLoading } = useQuery({
    queryFn: () => fetchData(`/users/${fetchedUser?._id}/posts`),
    queryKey: ["profile-posts", slug],
    enabled: !!fetchedUser,
    staleTime: Infinity,
  });

  const { data: liked, isLoading: likedIsLoading } = useQuery({
    queryFn: () => fetchData(`/users/${fetchedUser?._id}/liked`),
    queryKey: ["profile-liked", slug],
    enabled: !!fetchedUser,
  });

  const { data: bookmarked, isLoading: bookmarkedIsLoading } = useQuery({
    queryFn: () => fetchData(`/users/${fetchedUser?._id}/bookmarked`),
    queryKey: ["profile-bookmarked", slug],
    enabled: !!fetchedUser,
  });

  const { mutate: followUser } = useMutation({
    mutationFn: () =>
      protectedPostData(
        "/users/" + fetchedUser._id + "/toggle-follow",
        null,
        token
      ),
    onError: (error) => {
      dispatch(setNotification(error.data));
    },
    onSuccess: () => {
      setIsFollowing(!isFollowing);
      queryClient.invalidateQueries("profile");
    },
    enabled: !!fetchedUser && !!currentUser,
  });

  useEffect(() => {
    if (!currentUser || !fetchedUser) return;
    if (currentUser?.user?.following.includes(fetchedUser?._id))
      setIsFollowing(true);
    else setIsFollowing(false);
  }, [currentUser, fetchedUser]);

  if (isLoading || postsIsLoading || likedIsLoading || bookmarkedIsLoading)
    return <div>Loading...</div>;

  let posts = fetchedPosts;

  if (showCategory === "liked") posts = liked;
  if (showCategory === "bookmarked") posts = bookmarked;

  return (
    <main className="bg-[#222] min-h-screen text-white pt-20 relative overflow-hidden">
      {modalType && (
        <Modal user={fetchedUser} type={modalType} setType={setModalType} />
      )}
      <Section containerClass="border-x-2 border-[#202020]">
        <div className="relative">
          <img
            onClick={() => setModalType("banner")}
            className="w-full h-[25rem] object-cover cursor-pointer"
            src={`http://localhost:8080/` + fetchedUser.bannerImage}
            alt="Banner"
          />
          {currentUser?.user._id === fetchedUser._id && (
            <button
              onClick={() => setModalType("change-image")}
              className="bg-[#222] px-4 py-2 rounded-l-full hover:bg-purple-500 transition-all bottom-4 right-8 absolute flex items-center gap-2 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m12.05 19l2.85-2.825l-2.85-2.825L11 14.4l1.075 1.075q-.7.025-1.362-.225t-1.188-.775q-.5-.5-.763-1.15t-.262-1.3q0-.425.113-.85t.312-.825l-1.1-1.1q-.425.625-.625 1.325T7 12q0 .95.375 1.875t1.1 1.65t1.625 1.088t1.85.387l-.95.95zm4.125-4.25q.425-.625.625-1.325T17 12q0-.95-.363-1.888T15.55 8.45t-1.638-1.075t-1.862-.35L13 6.05L11.95 5L9.1 7.825l2.85 2.825L13 9.6l-1.1-1.1q.675 0 1.375.263t1.2.762t.763 1.15t.262 1.3q0 .425-.112.85t-.313.825zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                />
              </svg>

              <p>Change your banner</p>
            </button>
          )}
        </div>
        <div className="flex flex-col items-start w-full gap-4 relative -top-20 px-8">
          <div className="w-full flex justify-between items-start">
            <div className="w-2/5">
              <div className="flex flex-col gap-4">
                <img
                  onClick={() => setModalType("pfp")}
                  className="cursor-pointer border-4 ml-4 border-[#222] w-40 h-40 rounded-full object-cover"
                  src={`http://localhost:8080/` + fetchedUser.imageUrl}
                  alt="Pfp"
                />
                <div className="mb-4">
                  <p className="text-2xl font-bold">
                    {fetchedUser.fname}, {fetchedUser.lname}
                  </p>
                  <p className="text-md text-gray-500">{fetchedUser.email}</p>
                </div>
              </div>
              <div className="w-full flex flex-col gap-4">
                {fetchedUser.about ? (
                  <p>{fetchedUser.about}</p>
                ) : (
                  <p>No bio provided</p>
                )}
                <div className="flex items-center gap-10">
                  {fetchedUser.location ? (
                    <p>{fetchedUser.location}</p>
                  ) : (
                    <div className="flex items-center gap-2 font-thin text-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="m12.065 21.243l-.006-.005zm.182-.274a29 29 0 0 0 3.183-3.392c2.04-2.563 3.281-5.09 3.365-7.337a6.8 6.8 0 1 0-13.591 0c.085 2.247 1.327 4.774 3.366 7.337a29 29 0 0 0 3.183 3.392q.166.15.247.218zm-.985 1.165S4 16.018 4 10a8 8 0 1 1 16 0c0 6.018-7.262 12.134-7.262 12.134c-.404.372-1.069.368-1.476 0M12 12.8a2.8 2.8 0 1 0 0-5.6a2.8 2.8 0 0 0 0 5.6m0 1.2a4 4 0 1 1 0-8a4 4 0 0 1 0 8"
                        />
                      </svg>{" "}
                      <p>Unknown</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2 font-thin text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none">
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-width="1.5"
                          d="M14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14v-2c0-3.771 0-5.657 1.172-6.828S6.229 4 10 4h4c3.771 0 5.657 0 6.828 1.172S22 8.229 22 12v2c0 3.771 0 5.657-1.172 6.828c-.653.654-1.528.943-2.828 1.07M7 4V2.5M17 4V2.5M21.5 9H10.75M2 9h3.875"
                        />
                        <path
                          fill="currentColor"
                          d="M18 17a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-5 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0-4a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
                        />
                      </g>
                    </svg>
                    <p>
                      Joined{" "}
                      {formatDate(fetchedUser.createdAt, { showDay: false })}
                    </p>
                  </div>
                </div>
                <div className="w-full flex justify-between">
                  <div className="flex gap-2 items-end">
                    <p className="font-bold">{fetchedUser?.following.length}</p>
                    <p className="text-gray-500">Following</p>
                  </div>
                  <div className="flex gap-2 items-end">
                    <p className="font-bold">{fetchedUser?.followers.length}</p>
                    <p className="text-gray-500">Followers</p>
                  </div>
                  <div className="flex gap-2 items-end">
                    <p className="font-bold">{fetchedUser.posts.length}</p>
                    <p className="text-gray-500">Posts</p>
                  </div>
                </div>
                {fetchedUser._id === currentUser?.user._id && (
                  <button
                    onClick={() => setModalType("edit-profile")}
                    className="bg-purple-500 px-20 py-2 rounded-[2rem] font-semibold hover:rounded-none transition-all hover:bg-orange-500"
                  >
                    Edit profile
                  </button>
                )}
                {fetchedUser._id === currentUser?.user?._id && (
                  <div className="flex items-center gap-2 text-gray-500 underline hover:text-purple-500 transition-all cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="currentColor"
                        d="M3.26 11.602C3.942 8.327 6.793 6 10 6s6.057 2.327 6.74 5.602a.5.5 0 0 0 .98-.204C16.943 7.673 13.693 5 10 5s-6.943 2.673-7.72 6.398a.5.5 0 0 0 .98.204M10 8a3.5 3.5 0 1 0 0 7a3.5 3.5 0 0 0 0-7m-2.5 3.5a2.5 2.5 0 1 1 5 0a2.5 2.5 0 0 1-5 0"
                      />
                    </svg>
                    <p className="text-sm">See more statistics...</p>
                  </div>
                )}
                {currentUser && fetchedUser._id !== currentUser?.user?._id && (
                  <div className="flex items-center gap-2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                    >
                      <path
                        fill="currentColor"
                        d="m10 2.503l1.29 1.248a.426.426 0 0 0 .588 0a.393.393 0 0 0 0-.57L10.59 1.934L11.88.685a.394.394 0 0 0-.013-.557a.427.427 0 0 0-.576-.013L10 1.364L8.71.118a.43.43 0 0 0-.4-.104a.41.41 0 0 0-.295.284a.4.4 0 0 0 .108.389L9.41 1.933L8.122 3.18a.393.393 0 0 0 0 .57a.423.423 0 0 0 .589 0zM4 8a4.03 4.03 0 0 0-3.995 3.41c-.04.31.191.59.504.59h6.982c.313 0 .545-.28.504-.59C7.698 9.45 6 8 4 8m0-1a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5"
                      />
                    </svg>
                    <p className="text-sm">
                      {currentUser?.user.following.some((followedId) =>
                        fetchedUser.followers.some(
                          (follower) => follower._id === followedId
                        )
                      ) ? (
                        <span>
                          Followed by{" "}
                          {currentUser?.user.following
                            .filter((followedId) =>
                              fetchedUser.followers.some(
                                (follower) => follower._id === followedId
                              )
                            )
                            .map((id, index) => {
                              const matchingFollower =
                                fetchedUser.followers.find(
                                  (follower) => follower._id === id
                                );
                              return (
                                <Link to={`/profile/${matchingFollower.slug}`}>
                                  <span
                                    className="hover:text-purple-500 transition-all hover:underline"
                                    key={id}
                                  >
                                    {matchingFollower?.fname}
                                    {index !==
                                      currentUser?.user.following.filter(
                                        (followedId) =>
                                          fetchedUser.followers.some(
                                            (follower) =>
                                              follower._id === followedId
                                          )
                                      ).length -
                                        1 && ", "}
                                  </span>
                                </Link>
                              );
                            })}
                        </span>
                      ) : (
                        "Not followed by anyone you follow."
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="w-3/5 flex justify-end mt-24 items-center gap-4">
              {currentUser?.user?._id !== fetchedUser._id && (
                <>
                  <div class="relative group w-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 1024 1024"
                      className="hover:text-orange-500 transition-all hover:scale-125 cursor-pointer"
                    >
                      <path
                        fill="currentColor"
                        d="M924.3 338.4a447.6 447.6 0 0 0-96.1-143.3a443.1 443.1 0 0 0-143-96.3A443.9 443.9 0 0 0 512 64h-2c-60.5.3-119 12.3-174.1 35.9a444.1 444.1 0 0 0-141.7 96.5a445 445 0 0 0-95 142.8A449.9 449.9 0 0 0 65 514.1c.3 69.4 16.9 138.3 47.9 199.9v152c0 25.4 20.6 46 45.9 46h151.8a447.7 447.7 0 0 0 199.5 48h2.1c59.8 0 117.7-11.6 172.3-34.3A443.2 443.2 0 0 0 827 830.5c41.2-40.9 73.6-88.7 96.3-142c23.5-55.2 35.5-113.9 35.8-174.5c.2-60.9-11.6-120-34.8-175.6M312.4 560c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48s47.9 21.5 47.9 48s-21.4 48-47.9 48m199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48s47.9 21.5 47.9 48s-21.5 48-47.9 48m199.6 0c-26.4 0-47.9-21.5-47.9-48s21.5-48 47.9-48s47.9 21.5 47.9 48s-21.5 48-47.9 48"
                      />
                    </svg>
                    <span class="tooltip absolute left-full h-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none w-[8rem] text-center rounded-r-full">
                      Message {fetchedUser.fname}
                    </span>
                  </div>

                  <div class="relative group w-auto mr-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="hover:text-orange-500 transition-all hover:scale-125 cursor-pointer"
                    >
                      <path
                        fill="currentColor"
                        d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-.4 4.25l-7.07 4.42c-.32.2-.74.2-1.06 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44"
                      />
                    </svg>
                    <span class="tooltip absolute left-full h-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none w-[8rem] text-center rounded-r-full">
                      Email {fetchedUser.fname}
                    </span>
                  </div>
                </>
              )}
              {currentUser?.user?._id === fetchedUser._id && (
                <>
                  <button
                    onClick={() => setModalType("change-image")}
                    class="relative group w-auto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 20 20"
                      className="hover:text-orange-500 transition-all hover:scale-125 cursor-pointer"
                    >
                      <path
                        fill="currentColor"
                        d="M12.499 8a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1M3 6a3 3 0 0 1 3-3h7.999a3 3 0 0 1 3 3v3.002a2.86 2.86 0 0 0-1.898.838l-2.308 2.308l-1.741-1.714a1.5 1.5 0 0 0-2.105 0l-5.39 5.307A3 3 0 0 1 3 13.999zm9.499 3a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m-2.227 5.669l1.813-1.814l-1.735-1.709a.5.5 0 0 0-.702 0l-5.383 5.3c.49.348 1.088.552 1.735.552h3.22l.21-.844a3.2 3.2 0 0 1 .842-1.485m.707.707l4.829-4.83a1.87 1.87 0 1 1 2.644 2.646l-4.829 4.828a2.2 2.2 0 0 1-1.02.578l-1.498.375a.89.89 0 0 1-1.078-1.079l.374-1.498c.097-.386.296-.739.578-1.02"
                      />
                    </svg>
                    <span class="tooltip absolute left-full h-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none w-[12rem] text-center rounded-r-full">
                      Change profile picture
                    </span>
                  </button>
                  <Link to="/create-post">
                    <div class="relative group w-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="hover:text-orange-500 transition-all hover:scale-125 cursor-pointer"
                      >
                        <path
                          fill="currentColor"
                          d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 11h-4v4h-2v-4H7v-2h4V7h2v4h4z"
                        />
                      </svg>
                      <span class="tooltip absolute left-full h-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none w-[8rem] text-center rounded-r-full">
                        Add a post
                      </span>
                    </div>
                  </Link>

                  <button
                    onClick={() => setModalType("edit-profile")}
                    class="relative group w-auto mr-8"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="hover:text-orange-500 transition-all hover:scale-125 cursor-pointer"
                    >
                      <path
                        fill="currentColor"
                        d="M16.477 3.004c.167.015.24.219.12.338l-8.32 8.32a.75.75 0 0 0-.195.34l-1 3.83a.75.75 0 0 0 .915.915l3.829-1a.75.75 0 0 0 .34-.196l8.438-8.438a.198.198 0 0 1 .339.12a45.7 45.7 0 0 1-.06 10.073c-.223 1.905-1.754 3.4-3.652 3.613a47.5 47.5 0 0 1-10.461 0c-1.899-.213-3.43-1.708-3.653-3.613a45.7 45.7 0 0 1 0-10.611C3.34 4.789 4.871 3.294 6.77 3.082a47.5 47.5 0 0 1 9.707-.078"
                      />
                      <path
                        fill="currentColor"
                        d="M17.823 4.237a.25.25 0 0 1 .354 0l1.414 1.415a.25.25 0 0 1 0 .353L11.298 14.3a.25.25 0 0 1-.114.065l-1.914.5a.25.25 0 0 1-.305-.305l.5-1.914a.25.25 0 0 1 .065-.114z"
                      />
                    </svg>
                    <span class="tooltip absolute left-full h-full ml-2 top-1/2 -translate-y-1/2 bg-black text-white text-xs font-bold px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 pointer-events-none w-[8rem] text-center rounded-r-full ">
                      Edit profile
                    </span>
                  </button>
                </>
              )}
              {currentUser?.user?._id !== fetchedUser._id && (
                <button
                  onClick={followUser}
                  className="bg-purple-500 px-20 py-2 rounded-[2rem] font-semibold hover:rounded-none transition-all hover:bg-orange-500"
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
              )}
            </div>
          </div>{" "}
          <div className="flex w-full items-center my-10">
            <button
              onClick={() => setShowCategory("posts")}
              className="w-1/3 relative group cursor-pointer"
            >
              <div
                className={`py-2 w-full hover:bg-white hover:bg-opacity-10 text-center text-xl font-semibold transition-all flex items-center justify-center gap-2 group-hover:text-orange-500 ${
                  showCategory === "posts" && "bg-white bg-opacity-5"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M7.784 1.356a2.75 2.75 0 0 0-3.186 2.231l-2.43 13.787a2.75 2.75 0 0 0 2.23 3.186l11.818 2.084a2.75 2.75 0 0 0 3.185-2.23l2.432-13.788a2.75 2.75 0 0 0-2.231-3.186zM9.06 5.643A.75.75 0 1 0 8.8 7.12l7.878 1.39a.75.75 0 0 0 .26-1.478zm-1.563 4.548a.75.75 0 0 1 .869-.608l7.878 1.389a.75.75 0 1 1-.26 1.477l-7.879-1.39a.75.75 0 0 1-.608-.868m.174 3.33a.75.75 0 1 0-.26 1.477l4.924.869a.75.75 0 1 0 .26-1.478z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p>Posts</p>
              </div>
              {showCategory === "posts" && (
                <div className="h-1 translate-y-1/2 w-1/5 bg-purple-500 absolute left-1/2 -translate-x-1/2 rounded-full bottom-0 group-hover:bg-orange-500 transition-all"></div>
              )}
            </button>
            <button
              onClick={() => setShowCategory("liked")}
              className="w-1/3 relative group cursor-pointer"
            >
              <div
                className={`py-2 w-full hover:bg-white hover:bg-opacity-10 text-center text-xl font-semibold transition-all flex items-center justify-center gap-2 group-hover:text-orange-500 ${
                  showCategory === "liked" && "bg-white bg-opacity-5"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"
                  />
                </svg>
                <p>Liked</p>
              </div>
              {showCategory === "liked" && (
                <div className="h-1 translate-y-1/2 w-1/5 bg-purple-500 absolute left-1/2 -translate-x-1/2 rounded-full bottom-0 group-hover:bg-orange-500 transition-all"></div>
              )}
            </button>{" "}
            <button
              onClick={() => setShowCategory("bookmarked")}
              className="w-1/3 relative group cursor-pointer"
            >
              <div
                className={`py-2 w-full hover:bg-white hover:bg-opacity-10 text-center text-xl font-semibold transition-all flex items-center justify-center gap-2 group-hover:text-orange-500 ${
                  showCategory === "bookmarked" && "bg-white bg-opacity-5"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m12 18l-4.2 1.8q-1 .425-1.9-.162T5 17.975V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v12.975q0 1.075-.9 1.663t-1.9.162z"
                  />
                </svg>
                <p>Bookmarked</p>
              </div>
              {showCategory === "bookmarked" && (
                <div className="h-1 translate-y-1/2 w-1/5 bg-purple-500 absolute left-1/2 -translate-x-1/2 rounded-full bottom-0 group-hover:bg-orange-500 transition-all"></div>
              )}
            </button>
          </div>
          <div className="flex flex-col w-full">
            {posts?.data?.map((post) => (
              <Post
                onLike={() =>
                  handleInteraction({
                    postId: post._id,
                    interactionType: "like",
                  })
                }
                onBookmark={() =>
                  handleInteraction({
                    postId: post._id,
                    interactionType: "bookmark",
                  })
                }
                key={post._id}
                post={post}
              />
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
