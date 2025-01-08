import { useState } from "react";
import Input from "../components/Input";
import { handlePostInput } from "../utility/util";
import DynamicInput from "../components/DynamicInput";

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

  const handleAddTag = () => {
    setTags((prevTags) => {
      if (prevTags.length === MAX_TAGS) return prevTags;
      return [...prevTags, { id: Date.now(), label: "Tag" }];
    });
  };

  const deleteTag = (id) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
  };

  const handleAddLink = () => {
    setLinks((prevLinks) => {
      if (prevLinks.length === MAX_LINKS) return prevLinks;
      return [...prevLinks, { id: Date.now(), label: "Link" }];
    });
  };

  const deleteLink = (id) => {
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id));
  };

  console.log({ tags, links });

  return (
    <main className="mt-[5rem] flex justify-center bg-blue-100 h-auto min-h-screen w-full">
      <div className="w-[75rem] flex">
        <div className="w-1/2 mt-20">
          <h1 className="text-[3rem] font-semibold text-gray-800">
            Create a New Post
          </h1>
          <p className="mt-4 text-xl text-gray-700">
            Share your thoughts and ideas with the community. Fill out the form
            below to create a post.
          </p>
          <p className="mt-2 text-lg text-gray-600">
            Please make sure to provide relevant and respectful content. We
            value your contribution!
          </p>
        </div>
        <div className="w-1/2 mt-20 flex flex-col items-center">
          <form className="w-[90%] bg-white p-10 rounded-2xl shadow-md">
            <Input
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
              input="input"
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
            {tags.map((tag) => (
              <DynamicInput
                key={tag.id}
                name={tag.label}
                deleteInput={() => deleteTag(tag.id)}
              />
            ))}
            {tags.length !== MAX_TAGS && (
              <div
                onClick={handleAddTag}
                className="mt-2 flex items-center gap-2 bg-purple-200 bg-opacity-50 hover:bg-purple-300 transition-all cursor-pointer justify-between rounded-full pl-2 pr-4 py-1 w-fit"
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 5v14m-7-7h14"
                    />
                  </svg>
                </p>
                <p>Add a Tag</p>
              </div>
            )}
            <div className="bg-gray-300 h-[1px] w-full my-2"></div>
            {links.map((link) => (
              <DynamicInput
                key={link.id}
                name={link.label}
                deleteInput={() => deleteLink(link.id)}
              />
            ))}
            {links.length !== MAX_LINKS && (
              <div
                onClick={handleAddLink}
                className="mt-2 flex items-center gap-2 bg-orange-200 bg-opacity-50 hover:bg-orange-300 transition-all cursor-pointer justify-between rounded-full pl-2 pr-4 py-1 w-fit"
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 5v14m-7-7h14"
                    />
                  </svg>
                </p>
                <p>Add a Link</p>
              </div>
            )}
            <Input
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
              error={error}
              type="text"
              input="input"
              placeholder="Date"
              name="date"
              value={date}
              label="Date*"
              onChange={(e) => setDate(e.target.value)}
            />
            <Input
              error={error}
              type="text"
              input="textarea"
              placeholder="Content..."
              name="content"
              value={content}
              label="Content*"
              onChange={(e) => setContent(e.target.value)}
            />
          </form>
        </div>
      </div>
    </main>
  );
}
