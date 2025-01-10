import { useState } from "react";
import Input from "../components/Input";
import { handlePostInput } from "../utility/util";
import DynamicInput from "../components/DynamicInput";
import Create from "../assets/create.png";
import Publish from "../assets/publish.png";
import Connect from "../assets/connect.png";

const MAX_TAGS = 5;
const MAX_LINKS = 5;

export default function CreatePost() {
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const [tags, setTags] = useState([]);
  const [links, setLinks] = useState([]);

  const token = localStorage.getItem("token");

  const handleAddTag = () => {
    setTags((prevTags) => {
      if (prevTags.length === MAX_TAGS) return prevTags;
      return [
        ...prevTags,
        {
          id: Date.now(),
          value: "",
          label: "Tag",
        },
      ];
    });
  };

  const handleTagChange = (id, value) => {
    setTags((prevTags) =>
      prevTags.map((tag) => (tag.id === id ? { ...tag, value } : tag))
    );

    console.log(value);
  };

  const deleteTag = (id) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  const handleAddLink = () => {
    setLinks((prevLinks) => {
      if (prevLinks.length === MAX_LINKS) return prevLinks;
      return [
        ...prevLinks,
        {
          id: Date.now(),
          value: "",
          label: "Link",
        },
      ];
    });
  };

  const handleLinkChange = (id, value) => {
    setLinks((prevLinks) =>
      prevLinks.map((link) => (link.id === id ? { ...link, value } : link))
    );
  };

  const deleteLink = (id) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  const handleCreatePost = async () => {
    console.log(tags, links);

    setTags((prevTags) => prevTags.filter((tag) => tag.value !== ""));

    setLinks((prevLinks) => prevLinks.filter((link) => link.value !== ""));
    const formData = new FormData();
    formData.append("title", title);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("content", content);

    formData.append("image", imageUrl);

    formData.append("tags", JSON.stringify(tags));
    formData.append("links", JSON.stringify(links));

    const response = await fetch("http://localhost:8080/posts", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    const data = await response.json();
  };

  return (
    <main className="mt-[5rem] text-white flex justify-center bg-[#191919] h-auto min-h-screen w-full pb-20">
      <div className="w-[75rem] flex">
        <div className="w-1/2 h-[38rem] mt-20 flex flex-col justify-between">
          <div className="flex flex-col gap-8 items-start">
            <h1 className="text-[3rem] font-semibold text-white">
              Create a New Post
            </h1>
            <p className="mt-4 text-xl text-gray-200">
              Share your thoughts and ideas with the community. Fill out the
              form to create a post.
            </p>
            <p className="mt-1 text-lg text-gray-100">
              Please make sure to provide relevant and respectful content. We
              value your contribution!
            </p>
            <button className="bg-purple-500 hover:bg-orange-500 mt-8 py-2 px-4 flex rounded-[2rem] hover:rounded-none hover:rounded-bg-orange-500 transition-all">
              Check the post feed
            </button>
          </div>
          <div className="flex justify-between gap-4">
            <div className="bg-[#222] p-4 w-1/3 rounded-md shadow-lg">
              <div className="flex mb-4 justify-between items-center">
                <p className="text-sm font-bold">Create a post</p>
                <img className="w-[2rem]" src={Create} alt="create post icon" />
              </div>
              <p className="text-xs text-gray-500">
                Take a moment to share something you are passionate about, or
                just whatever else might come to mind!
              </p>
            </div>
            <div className="bg-[#222] p-4 w-1/3 rounded-md shadow-lg">
              <div className="flex mb-4 justify-between items-center gap-4">
                <p className="text-sm font-bold">Publish the post</p>
                <img
                  className="w-[2rem]"
                  src={Publish}
                  alt="publish post icon"
                />
              </div>
              <p className="text-xs text-gray-500">
                Share your post with the world and let others engage with your
                content!
              </p>
            </div>
            <div className="bg-[#222] p-4 w-1/3 rounded-md shadow-lg">
              <div className="flex mb-4 justify-between items-center">
                <p className="text-sm font-bold">Connect w/others</p>
                <img
                  className="w-[2rem]"
                  src={Connect}
                  alt="connect with others icon"
                />
              </div>
              <p className="text-xs text-gray-500">
                Engage with the community by commenting, liking, and sharing
                posts!
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2 mt-20 flex flex-col items-center">
          <form className="w-[90%] bg-[#222] p-10 rounded-2xl shadow-md">
            <Input
              className="bg-[#191919] text-white w-full py-2 px-4 rounded-lg mt-1 mb-4"
              error={error}
              type="title"
              input="input"
              placeholder="The title"
              name="title"
              value={title}
              label="The title*"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              error={error}
              type="file"
              input="file"
              name="image"
              label="Image*"
              onChange={(e) =>
                handlePostInput(
                  e.target.value,
                  e.target.files,
                  null,
                  setImageUrl
                )
              }
            />
            {tags.map((tag, index) => (
              <DynamicInput
                className="bg-[#191919] text-white w-full py-2 px-4 rounded-lg"
                key={tag.id}
                name={tag.label}
                text={`${tag.label} #${index + 1}`}
                deleteInput={() => deleteTag(tag.id)}
                onChange={(e) => handleTagChange(tag.id, e.target.value)}
              />
            ))}
            {tags.length !== MAX_TAGS && (
              <div
                onClick={handleAddTag}
                className="my-2 flex items-center gap-2 bg-purple-500 bg-opacity-50 hover:bg-purple-600 transition-all cursor-pointer justify-between rounded-full pl-2 pr-4 py-1 w-fit"
              >
                <p className="flex items-center">
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
                </p>
                <p>Add a Tag</p>
              </div>
            )}
            <div className="bg-[#191919] h-[1px] w-full my-2"></div>
            {links.map((link, index) => (
              <DynamicInput
                className="bg-[#191919] text-white w-full py-2 px-4 rounded-lg"
                key={link.id}
                name={link.label}
                text={`${link.label} #${index + 1}`}
                deleteInput={() => deleteLink(link.id)}
                onChange={(e) => handleLinkChange(link.id, e.target.value)}
              />
            ))}
            {links.length !== MAX_LINKS && (
              <div
                onClick={handleAddLink}
                className="my-2 flex items-center gap-2 bg-orange-500 bg-opacity-50 hover:bg-orange-600 transition-all cursor-pointer justify-between rounded-full pl-2 pr-4 py-1 w-fit"
              >
                <p className="flex items-center">
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
                </p>
                <p>Add a Link</p>
              </div>
            )}
            <Input
              className="bg-[#191919] text-white w-full py-2 px-4 rounded-lg mt-1 mb-4"
              error={error}
              type="text"
              input="input"
              placeholder="Location"
              name="location"
              value={location}
              label="Location*"
              onChange={(e) => setLocation(e.target.value)}
            />
            <Input
              className="bg-[#191919] text-white w-full py-2 px-4 rounded-lg mt-1 mb-4"
              error={error}
              type="date"
              input="input"
              placeholder="Date"
              name="date"
              value={date}
              label="Date*"
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              className="bg-[#191919] text-white w-full py-2 px-4 rounded-lg h-[10rem] min-h-[10rem] max-h-[10rem]"
              error={error}
              type="text"
              input="textarea"
              placeholder="Content..."
              name="content"
              value={content}
              label="Content*"
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              onClick={async (e) => {
                e.preventDefault();
                await handleCreatePost();
              }}
              className="bg-purple-500 hover:bg-orange-500 py-4 text-white font-semibold w-full rounded-[2rem] hover:rounded-none transition-all mt-4"
            >
              Create the post
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
