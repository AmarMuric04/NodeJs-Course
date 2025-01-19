import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchData } from "../utility/async";
import Section from "../components/Section";
import Title from "../components/Title";
import { useSelector } from "react-redux";
import Post from "../components/Post";
import { usePostInteraction } from "../utility/hooks";

export function Profile() {
  const { slug } = useParams();
  const { user } = useSelector((state) => state.auth);

  const { handleInteraction } = usePostInteraction();

  console.log(slug);

  const { data: fetchedUser, isLoading } = useQuery({
    queryFn: () => fetchData("/users/profile/" + slug),
    queryKey: ["profile"],
  });

  const { data: fetchedPosts, isLoading: postsIsLoading } = useQuery({
    queryFn: () => fetchData(`/users/${fetchedUser?._id}/posts`),
    queryKey: ["profile-posts", fetchedUser?._id],
    enabled: !!fetchedUser,
  });

  console.log(fetchedPosts);

  if (isLoading || postsIsLoading) return <div>Loading...</div>;

  return (
    <main className="bg-[#222] min-h-screen text-white pt-20">
      <Section>
        <img
          className="w-full h-[25rem] object-cover"
          src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
          alt="1243"
        />
        <div className="flex flex-col gap-4 relative -top-20">
          <div className="flex flex-col gap-4">
            <img
              className="border-4 ml-4 border-[#222] w-40 h-40 rounded-full object-cover"
              src={`http://localhost:8080/` + fetchedUser.imageUrl}
              alt="Pfp"
            />
            <div>
              <p className="text-2xl font-bold">
                {fetchedUser.fname}, {fetchedUser.lname}
              </p>
              <p className="text-lg text-gray-500">{fetchedUser.email}</p>
            </div>
          </div>
          {fetchedUser.bio ? <p>{fetchedUser.bio}</p> : <p>No bio provided</p>}
          <div className="flex items-center gap-10">
            {fetchedUser.location ? (
              <p>{fetchedUser.location}</p>
            ) : (
              <div className="flex items-center gap-2">
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
            <div className="flex items-center gap-2">
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
              <p>Joined {fetchedUser.createdAt}</p>
            </div>
          </div>
          <div className="flex w-1/3 justify-between">
            <div className="flex gap-4 items-end">
              <p className="text-lg font-bold">0</p>
              <p className="font-semibold text-purple-500">Following</p>
            </div>
            <div className="flex gap-4 items-end">
              <p className="text-lg font-bold">0</p>
              <p className="font-semibold text-purple-500">Followers</p>
            </div>
            <div className="flex gap-4 items-end">
              <p className="text-lg font-bold">0</p>
              <p className="font-semibold text-purple-500">Posts</p>
            </div>
          </div>
          <div className="flex">
            <button className="py-2 w-1/3 text-center my-10 text-xl font-semibold border-b-2 border-purple-500 bg-white bg-opacity-10 hover:bg-opacity-5 transition-all">
              Posts
            </button>
            <button className="py-2 w-1/3 text-center my-10 text-xl font-semibold border-b-2 bg-white bg-opacity-0 hover:bg-opacity-5 transition-all">
              Liked
            </button>
            <button className="py-2 w-1/3 text-center my-10 text-xl font-semibold border-b-2 bg-white bg-opacity-0 hover:bg-opacity-5 transition-all">
              Bookmarked
            </button>
          </div>
          {fetchedPosts.data.map((post) => (
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
      </Section>
    </main>
  );
}
