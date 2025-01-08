import ReactImg from "./assets/react.webp";
import MongoImg from "./assets/mongodb.png";
import ExpressImg from "./assets/expressjs.png";
import NodeImg from "./assets/nodejs.png";
import TailWindImg from "./assets/tailwind.png";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <main className="bg-blue-100 flex justify-center h-auto min-h-screen w-full">
      <div className="w-[75rem] mt-[5rem]">
        <h1 className="mt-[10rem] text-[4rem] leading-[3.5rem] font-bold flex">
          A{" "}
          <span className="bg-purple-500 bg-opacity-50 mx-2 flex -skew-x-12 rounded-xl">
            <p className="px-2 mb-2 skew-x-12">cozy place</p>
          </span>{" "}
          to
        </h1>
        <h1 className="text-[4rem] leading-[3.5rem] font-bold flex">
          share anything you like!
        </h1>
        <p className="mt-8 w-1/2 text-gray-500 leading-tight">
          <span className="font-semibold">What are you waiting for?</span>{" "}
          <br /> Let’s create a post and share what inspires you. Whether it’s a
          hobby, an idea, or something you’re passionate about, your story
          matters. <br />
          Take the first step—your voice could encourage someone else or start a
          meaningful connection!
        </p>
        <h1 className="mt-10 mb-4 font-semibold text-sm">Technologies used:</h1>
        <div className="h-[5rem] flex items-center mb-20 gap-10">
          <img className="h-full" src={MongoImg} alt="MongoDB Logo" />
          <img className="h-full" src={NodeImg} alt="NodeJS Logo" />
          <img className="h-full" src={ReactImg} alt="React Logo" />
          <img className="h-full" src={ExpressImg} alt="ExpressJS Logo" />
          <img className="h-full py-2" src={TailWindImg} alt="TailWind Logo" />
        </div>
        <div className="flex items-center gap-4 mt-20">
          <Link to="/create-post">
            <button className="bg-purple-500 text-white py-2 px-8 rounded-[2rem] hover:rounded-none transition-all font-semibold">
              Create a Post
            </button>
          </Link>
          <p className="cursor-pointer hover:underline text-purple-500">
            Check out other posts
          </p>
        </div>
        <div className="mt-24 text-center">
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
        <div className="mt-24">
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

        {/* New Section: How It Works */}
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

        {/* New Section: User Testimonials */}
        <div className="mt-24 bg-gray-50 py-12">
          <h2 className="text-3xl font-semibold text-gray-700 text-center">
            What Our Users Say
          </h2>
          <div className="mt-8 flex justify-center gap-8">
            <div className="max-w-xs p-6 bg-white rounded-lg shadow-lg text-center">
              <p className="text-gray-600">
                "This platform is amazing! It’s so easy to share my interests
                and connect with like-minded people!"
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

        {/* New Section: Getting Started */}
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

        {/* New Section: Popular Topics */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-semibold text-gray-700">
            Popular Topics
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Explore a variety of topics that users are sharing and discussing.
            Whether it's tech, lifestyle, or hobbies, there's always something
            for everyone!
          </p>
          <div className="mt-8 flex justify-center gap-8">
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all">
              Tech
            </button>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all">
              Lifestyle
            </button>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all">
              Hobbies
            </button>
            <button className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all">
              Travel
            </button>
          </div>
        </div>

        {/* New Section: Why Join Us */}
        <div className="mt-24 bg-gray-50 py-12">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Why Join Us?
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto text-center">
            Join a vibrant community where you can share your passions, learn
            from others, and connect with people who share your interests. Our
            platform is safe, friendly, and welcoming!
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

        {/* New Section: Footer */}
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
      </div>
    </main>
  );
};

export default App;
