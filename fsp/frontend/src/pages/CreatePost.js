import { useEffect, useState } from "react";
import Input from "../components/Input";
import { handlePostInput } from "../utility/util";
import DynamicInput from "../components/DynamicInput";
import Create from "../assets/create.png";
import Publish from "../assets/publish.png";
import Connect from "../assets/connect.png";
import { useDispatch } from "react-redux";
import { setNotification } from "../storage/notificationSlice";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { protectedPostData } from "../utility/async";
import { useNavigate } from "react-router-dom";

const MAX_TAGS = 5;
const MAX_LINKS = 5;

export default function CreatePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [post, setPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
    location: "",
    date: "",
    tags: [],
    links: [],
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const [tags, setTags] = useState([]);
  const [links, setLinks] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (error) setTimeout(() => setError(null), 3000);
  }, [setError, error]);

  const handleAddLabel = (cb, label) =>
    cb((prev) => {
      if (prev.length === MAX_TAGS) return prev;
      return [
        ...prev,
        {
          id: Date.now(),
          value: "",
          label,
        },
      ];
    });

  const handleChangeLabel = (cb, id, value) =>
    cb((prev) =>
      prev.map((label) => (label.id === id ? { ...label, value } : label))
    );

  const handleDeleteLabel = (cb, id) =>
    cb((prev) => prev.filter((label) => label.id !== id));

  const { mutate: addPost, isPending } = useMutation({
    mutationFn: () => {
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

      return protectedPostData("/posts", formData, token);
    },
    onError: (error) => {
      setError(error);
    },
    onSuccess: (data) => {
      dispatch(setNotification(data));
      navigate("/feed?page=1");
    },
  });

  return (
    <main className=" text-white flex justify-center bg-[#222] h-auto min-h-screen w-full pb-20">
      <div className="w-[75rem] flex mt-[5rem]">
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
            <Link to="/feed?page=1">
              <button className="bg-purple-500 hover:bg-orange-500 mt-8 py-2 px-4 flex rounded-[2rem] hover:rounded-none hover:rounded-bg-orange-500 transition-all">
                Check the post feed
              </button>
            </Link>
          </div>
          <div className="flex justify-between gap-4">
            <div className="bg-[#191919] p-4 w-1/3 rounded-md shadow-lg">
              <div className="flex mb-4 justify-between items-center">
                <p className="text-sm font-bold">Create a post</p>
                <img className="w-[2rem]" src={Create} alt="create post icon" />
              </div>
              <p className="text-xs text-gray-500">
                Take a moment to share something you are passionate about, or
                just whatever else might come to mind!
              </p>
            </div>
            <div className="bg-[#191919] p-4 w-1/3 rounded-md shadow-lg">
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
            <div className="bg-[#191919] p-4 w-1/3 rounded-md shadow-lg">
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addPost();
            }}
            className="w-[90%] bg-[#191919] p-10 rounded-2xl shadow-md"
          >
            {error && (
              <div className="flex w-full -top-[4rem]">
                <p className="bg-red-400 mb-10 w-full text-center bg-opacity-50 border-2 border-red-600 py-2 px-4 rounded-md">
                  {error.message}
                </p>
              </div>
            )}
            <Input
              extraClasses="border-2 text-white w-full py-2 px-4 rounded-lg mt-1 mb"
              normalClass="bg-[#222] border-[#222]"
              onErrorClass="border-red-600 bg-[#222]"
              error={error}
              type="title"
              input="input"
              placeholder="The title"
              name="title"
              value={title}
              label="Title (required*)"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              extraClasses="border-2 text-white w-full py-2 px-4 rounded-lg mt-1 mb"
              normalClass="bg-[#222] border-purple-500 hover:border-orange-500"
              onErrorClass="border-red-600 bg-red-500"
              error={error}
              type="file"
              input="file"
              name="imageUrl"
              label="Image (optional*)"
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
                className="bg-[#222] text-white w-full py-2 px-4 rounded-lg"
                key={tag.id}
                name={tag.label}
                text={`${tag.label} #${index + 1}`}
                deleteInput={() => handleDeleteLabel(setTags, tag.id)}
                onChange={(e) =>
                  handleChangeLabel(setTags, tag.id, e.target.value)
                }
              />
            ))}
            {tags.length !== MAX_TAGS && (
              <div
                onClick={() => handleAddLabel(setTags)}
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
            <div className="bg-[#222] h-[1px] w-full my-2"></div>
            {links.map((link, index) => (
              <DynamicInput
                className="bg-[#222] text-white w-full py-2 px-4 rounded-lg"
                key={link.id}
                name={link.label}
                text={`${link.label} #${index + 1}`}
                deleteInput={() => handleDeleteLabel(setLinks, link.id)}
                onChange={(e) =>
                  handleChangeLabel(setLinks, link.id, e.target.value)
                }
              />
            ))}
            {links.length !== MAX_LINKS && (
              <div
                onClick={() => handleAddLabel(setLinks)}
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
              extraClasses="border-2 text-white w-full py-2 px-4 rounded-lg mt-1 mb"
              normalClass="bg-[#222] border-[#222]"
              onErrorClass="border-red-600"
              error={error}
              type="text"
              input="input"
              placeholder="Location"
              name="location"
              value={location}
              label="Location (optional*)"
              onChange={(e) => setLocation(e.target.value)}
            />
            <Input
              extraClasses="border-2 text-white w-full py-2 px-4 rounded-lg mt-1 mb"
              normalClass="bg-[#222] border-[#222]"
              onErrorClass="border-red-600"
              error={error}
              type="date"
              input="input"
              placeholder="Date"
              name="date"
              value={date}
              label="Date (optional*)"
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              extraClasses="border-2 text-white w-full py-2 px-4 rounded-lg h-[10rem] min-h-[10rem] max-h-[10rem]"
              normalClass="bg-[#222] border-[#222]"
              onErrorClass="border-red-600 bg-[#222]"
              error={error}
              type="text"
              input="textarea"
              placeholder="Content..."
              name="content"
              value={content}
              label="Content (required*)"
              onChange={(e) => setContent(e.target.value)}
            />
            <button
              disabled={error || isPending}
              className="bg-purple-500 hover:bg-orange-500 py-4 text-white font-semibold w-full rounded-[2rem] hover:rounded-none transition-all mt-4"
            >
              {isPending ? "Creating..." : "Create the post"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
