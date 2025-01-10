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
            <p className="cursor-pointer hover:underline text-purple-500 hover:text-orange-500 transition-all">
              Check out other posts
            </p>
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
        <div className="w-[75rem] mt-80">
          <h2 className="text-2xl font-semibold text-gray-700">
            About This Platform
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            This platform is designed to be a cozy space where you can freely
            share your thoughts, hobbies, and experiences with others. Whether
            you're passionate about coding, cooking, or traveling, this is the
            place to connect with like-minded people!
          </p>
        </div>
      </section>
      <section className="bg-[#191919] w-full flex justify-center">
        <div className="w-[75rem]">
          <h2 className="text-3xl font-semibold text-gray-700">Features</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">Create and Share</h3>
              <p className="mt-4 text-gray-600">
                Easily create posts to share your thoughts, interests, and
                hobbies with others!
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">Interactive Community</h3>
              <p className="mt-4 text-gray-600">
                Engage with other users by liking, commenting, and sharing posts
                that resonate with you.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">User-Friendly Interface</h3>
              <p className="mt-4 text-gray-600">
                Enjoy an easy-to-use platform designed with simplicity and
                accessibility in mind.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold">Customizable Themes</h3>
              <p className="mt-4 text-gray-600">
                Personalize your profile with various themes and colors to suit
                your style.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="mt-24">
        <h2 className="text-3xl font-semibold text-gray-700">How It Works</h2>
        <p className="mt-4 text-lg text-gray-500">
          Creating and sharing posts is quick and easy! Follow these simple
          steps:
        </p>
        <ol className="mt-8 list-decimal pl-8 text-gray-600">
          <li>Create an account or log in to your existing profile.</li>
          <li>Click the "Create a Post" button to start writing.</li>
          <li>Customize your post with images, text, and more.</li>
          <li>Share it with the community and engage with others.</li>
        </ol>
      </div>
      <div className="mt-24 bg-gray-50 py-12">
        <h2 className="text-3xl font-semibold text-gray-700 text-center">
          What Our Users Say
        </h2>
        <div className="mt-8 flex justify-center gap-8">
          <div className="max-w-xs p-6 bg-white rounded-lg shadow-lg text-center">
            <p className="text-gray-600">
              "This platform is amazing! It’s so easy to share my interests and
              connect with like-minded people!"
            </p>
            <p className="mt-4 font-bold text-gray-700">Jane Doe</p>
            <p className="text-sm text-gray-500">Creative Writer</p>
          </div>
          <div className="max-w-xs p-6 bg-white rounded-lg shadow-lg text-center">
            <p className="text-gray-600">
              "I love how user-friendly this site is. I’ve made so many new
              friends here!"
            </p>
            <p className="mt-4 font-bold text-gray-700">John Smith</p>
            <p className="text-sm text-gray-500">Software Developer</p>
          </div>
        </div>
      </div>
      <div className="mt-24 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          Getting Started
        </h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          To get started, simply create an account and share your first post.
          Engage with others and start building a community around the things
          you love.
        </p>
      </div>
      <div className="mt-24 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">Popular Topics</h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
          Explore a variety of topics that users are sharing and discussing.
          Whether it's tech, lifestyle, or hobbies, there's always something for
          everyone!
        </p>
        <div className="mt-8 flex justify-center gap-8">
          <button className="bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600 transition-all">
            Tech
          </button>
          <button className="bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600 transition-all">
            Lifestyle
          </button>
          <button className="bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600 transition-all">
            Hobbies
          </button>
          <button className="bg-purple-500 text-white py-2 px-6 rounded-lg hover:bg-purple-600 transition-all">
            Travel
          </button>
        </div>
      </div>
      <div className="mt-24 bg-gray-50 py-12">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Why Join Us?
        </h2>
        <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto text-center">
          Join a vibrant community where you can share your passions, learn from
          others, and connect with people who share your interests. Our platform
          is safe, friendly, and welcoming!
        </p>
        <div className="mt-8 flex justify-center gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-gray-700">
              Build Connections
            </h3>
            <p className="mt-4 text-gray-600">
              Meet new people and grow your network by connecting with others
              who share your interests.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-gray-700">
              Share Your Story
            </h3>
            <p className="mt-4 text-gray-600">
              Express yourself and tell your story to a community that cares
              about what you have to say.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-gray-700">
              Inspire and Be Inspired
            </h3>
            <p className="mt-4 text-gray-600">
              Find inspiration in the posts of others, and let your own
              experiences inspire those around you.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-24 bg-gray-800 text-white py-8 text-center">
        <p className="text-lg">© 2025 CozySpace. All rights reserved.</p>
        <div className="mt-4">
          <a href="#" className="hover:underline mx-4">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline mx-4">
            Terms of Service
          </a>
          <a href="#" className="hover:underline mx-4">
            Contact Us
          </a>
        </div>
      </div>
    </main>
  );
};

export default App;
