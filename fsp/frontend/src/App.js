import ReactImg from "./assets/react.webp";
import MongoImg from "./assets/mongodb.png";
import ExpressImg from "./assets/expressjs.png";
import NodeImg from "./assets/nodejs.png";
import TailWindImg from "./assets/tailwind.png";
import { Link } from "react-router-dom";
import { Illustration } from "./assets/icons";

const App = () => {
  return (
    <main className="bg-[#222] text-white flex flex-col items-center justify-center h-auto min-h-screen w-full">
      <div className="absolute top-60 right-32">
        <Illustration />
      </div>
      <section className="bg-[#222] w-full flex justify-center">
        <div className="w-[75rem] my-20">
          <h1 className="mt-[10rem] text-[4rem] leading-[3.5rem] font-bold flex">
            A{" "}
            <span className="bg-purple-500 mx-2 flex -skew-x-12 rounded-xl">
              <p className="px-2 mb-2 skew-x-12">cozy place</p>
            </span>{" "}
            to
          </h1>
          <h1 className="text-[4rem] leading-[3.5rem] font-bold flex">
            share anything you like!
          </h1>
          <p className="mt-8 w-1/2 text-gray-300 leading-tight">
            <span className="font-semibold text-lg">
              What are you waiting for?
            </span>{" "}
            <br /> Let’s create a post and share what inspires you. Whether it’s
            a hobby, an idea, or something you’re passionate about, your story
            matters. <br />
            Take the first step—your voice could encourage someone else or start
            a meaningful connection!
          </p>
          <h1 className="mt-10 mb-4 font-semibold text-sm">
            Technologies used:
          </h1>
          <div className="h-[5rem] flex items-center mb-20 gap-10">
            <img className="h-full" src={MongoImg} alt="MongoDB Logo" />
            <img className="h-full" src={NodeImg} alt="NodeJS Logo" />
            <img className="h-full" src={ReactImg} alt="React Logo" />
            <img className="h-full" src={ExpressImg} alt="ExpressJS Logo" />
            <img
              className="h-full py-2"
              src={TailWindImg}
              alt="TailWind Logo"
            />
          </div>
          <div className="flex items-center gap-4 mt-32">
            <Link to="/create-post">
              <button className="bg-purple-500 hover:bg-orange-500 text-white py-2 px-8 rounded-[2rem] hover:rounded-none transition-all font-semibold">
                Create a Post
              </button>
            </Link>
            <Link
              to="/feed?page=1"
              className="cursor-pointer hover:underline text-purple-500 hover:text-orange-500 transition-all"
            >
              Check out other posts
            </Link>
          </div>
          <div className="mt-20 flex gap-8 text-purple-500">
            <a
              className="hover:text-orange-500 underline"
              href="https://github.com/amarmuric04/"
            >
              Github
            </a>
            <a
              className="hover:text-orange-500 underline"
              href="https://www.linkedin.com/in/amar-muri%C4%87-52564b2a2/"
            >
              LinkedIn
            </a>
            <a
              className="hover:text-orange-500 underline"
              href="mailto:muricamar2004@gmail.com"
            >
              Email
            </a>
          </div>
        </div>
      </section>
      <section className="bg-[#191919] w-full flex justify-center text-center relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          fill="#222"
          className="absolute top-0 left-0"
        >
          <path d="M0 1v99c134.3 0 153.7-99 296-99H0Z" opacity=".5"></path>
          <path
            d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z"
            opacity=".5"
          ></path>
          <path d="M617 1v86C372 119 384 1 196 1h421Z" opacity=".5"></path>
          <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
        </svg>
        <div className="w-[75rem] bg-[#191919] h-[50rem]"></div>
      </section>
      <section className="bg-[#191919] w-full flex justify-center">
        <div className="w-[75rem]"></div>
      </section>
    </main>
  );
};

export default App;
