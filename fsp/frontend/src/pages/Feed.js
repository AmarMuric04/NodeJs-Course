import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Post from "../components/Post";

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const handleGetPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/posts");

        if (!response.ok) {
          throw new Error("Error during fetch of posts.");
        }

        const data = await response.json();

        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      }
    };

    handleGetPosts();
  }, []);

  return (
    <main className="bg-[#222] text-white h-auto min-h-screen w-full flex mt-[5rem]">
      <section className="w-full flex justify-center mt-20">
        <div className="w-[75rem] text-white">
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
          {posts && (
            <div>
              {posts.map((post) => (
                <Post key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
