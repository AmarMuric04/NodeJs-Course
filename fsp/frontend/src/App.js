// External Libraries
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

// Components
import ReviewForm from "./components/ReviewForm";
import Reviews from "./components/Reviews";

// Utilities
import { fetchData } from "./utility/async";

// Assets: Logos and Images
import logo from "./assets/light-logo.png";
import ReactImg from "./assets/react.webp";
import MongoImg from "./assets/mongodb.png";
import ExpressImg from "./assets/expressjs.png";
import NodeImg from "./assets/nodejs.png";
import TailWindImg from "./assets/tailwind.png";
import ReduxImg from "./assets/redux.png";
import AxiosImg from "./assets/axios.png";
import QueryImg from "./assets/query.webp";
import RouterDomImg from "./assets/rrdom.png";
import JWTImg from "./assets/jwt.png";
import MulterImg from "./assets/multer.png";
import MongooseImg from "./assets/mongoose.png";

// Assets: Icons
import { Create, Curate, Engage, Find, Illustration } from "./assets/icons";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const scrollRef = useRef(null);
  const queryClient = useQueryClient();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft();
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollRight();
    }
  };

  const handleHover = () => {
    queryClient.prefetchQuery(
      ["posts"],
      fetchData("http://localhost:8080/posts")
    );
  };

  return (
    <main className="bg-[#222] overflow-x-hidden text-white flex flex-col items-center justify-center h-auto min-h-screen w-full">
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
          <div className="overflow-hidden w-1/2">
            <div className="flex items-center gap-10 animate-scroll-right">
              <img className="h-[5rem]" src={MongoImg} alt="MongoDB Logo" />
              <img className="h-[5rem]" src={NodeImg} alt="NodeJS Logo" />
              <img className="h-[5rem]" src={ReactImg} alt="React Logo" />
              <img className="h-[5rem]" src={ExpressImg} alt="ExpressJS Logo" />
              <img
                className="h-[5rem] py-2"
                src={TailWindImg}
                alt="TailWind Logo"
              />{" "}
              <img className="h-[5rem] py-2" src={JWTImg} alt="JWT Logo" />{" "}
              <img className="h-[5rem] py-2" src={ReduxImg} alt="Redux Logo" />{" "}
              <img
                className="h-[5rem] py-2"
                src={RouterDomImg}
                alt="RDom Logo"
              />
              <img
                className="h-[5rem] py-2"
                src={MulterImg}
                alt="Multer Logo"
              />
              <img
                className="h-[5rem] py-2"
                src={MongooseImg}
                alt="Mongoose Logo"
              />
              <img className="h-[5rem] py-4" src={AxiosImg} alt="Axios Logo" />
              <img className="h-[5rem] py-2" src={QueryImg} alt="Query Logo" />
              {/* ... */}
              <img className="h-[5rem]" src={MongoImg} alt="MongoDB Logo" />
              <img className="h-[5rem]" src={NodeImg} alt="NodeJS Logo" />
              <img className="h-[5rem]" src={ReactImg} alt="React Logo" />
              <img className="h-[5rem]" src={ExpressImg} alt="ExpressJS Logo" />
              <img
                className="h-[5rem] py-2"
                src={TailWindImg}
                alt="TailWind Logo"
              />
              <img className="h-[5rem] py-2" src={JWTImg} alt="JWT Logo" />{" "}
              <img className="h-[5rem] py-2" src={ReduxImg} alt="Redux Logo" />{" "}
              <img
                className="h-[5rem] py-2"
                src={RouterDomImg}
                alt="RDom Logo"
              />
              <img
                className="h-[5rem] py-2"
                src={MulterImg}
                alt="Multer Logo"
              />
              <img
                className="h-[5rem] py-2"
                src={MongooseImg}
                alt="Mongoose Logo"
              />{" "}
              <img className="h-[5rem] py-4" src={AxiosImg} alt="Axios Logo" />
              <img className="h-[5rem] py-2" src={QueryImg} alt="Query Logo" />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-32">
            <Link to="/create-post">
              <button className="bg-purple-500 hover:bg-orange-500 text-white py-2 px-8 rounded-[2rem] hover:rounded-none transition-all font-semibold">
                Create a Post
              </button>
            </Link>
            <Link
              onMouseEnter={handleHover}
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
      <section className="bg-[#191919] w-full flex justify-center relative">
        <svg
          id="about"
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
        <div x className="text-gray-300 w-[75rem] bg-[#191919] mt-80 mb-48">
          <h2 className="text-xs uppercase leading-[0.1rem] text-purple-500 font-semibold">
            About this website
          </h2>
          <h1 className="text-[3rem] font-bold my-4">What is this about?</h1>
          <p className="text-gray-400 w-2/3">
            Welcome to our platform, where sharing your thoughts has never been
            easier! Create an account, share your ideas, and connect with others
            through posts. Engage with the community by liking and bookmarking
            content that inspires you. Whether you're here to express yourself
            or discover something new, this is the space for meaningful
            connections.
          </p>
          <div className="mt-8 flex flex-col gap-8">
            <div className="flex gap-8">
              <div className="bg-[#222] hover:shadow-orange-500 shadow-md transition-all justify-between items-center flex p-10 w-1/2 rounded-xl">
                <div className="bg-white bg-opacity-10 p-4 rounded-full">
                  <Create h="48" w="48" />
                </div>
                <div className="flex flex-col gap-4 w-4/5">
                  <h1 className="text-2xl font-semibold">
                    Create without limits
                  </h1>
                  <p className="">
                    Got something to say? Share it with the world.
                  </p>
                  <p className="text-gray-500">
                    📝 Post stories, updates, or ideas—your content, your way.
                  </p>
                </div>
              </div>
              <div className="bg-[#222] hover:shadow-orange-500 shadow-md transition-all justify-between items-center flex p-10 w-1/2 rounded-xl">
                <div className="bg-white bg-opacity-10 p-4 rounded-full">
                  <Engage h="48" w="48" />
                </div>
                <div className="flex flex-col gap-4 w-4/5">
                  <h1 className="text-2xl font-semibold">Engage & Inspire</h1>
                  <p className="">
                    Support creators by reacting to their posts.
                  </p>
                  <p className="text-gray-500">
                    🔥 Like, comment, and bookmark the content that moves you.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-8">
              <div className="bg-[#222] hover:shadow-orange-500 shadow-md transition-all justify-between items-center flex p-10 w-1/2 rounded-xl">
                <div className="bg-white bg-opacity-10 p-4 rounded-full">
                  <Find h="48" w="48" />
                </div>
                <div className="flex flex-col gap-4 w-4/5">
                  <h1 className="text-2xl font-semibold">Curate Your Feed</h1>
                  <p className="">Discover content that matches your vibe.</p>
                  <p className="text-gray-500">
                    🌎 Follow topics, connect with creators, and explore endless
                    ideas.
                  </p>
                </div>
              </div>
              <div className="bg-[#222] hover:shadow-orange-500 shadow-md transition-all justify-between items-center flex p-10 w-1/2 rounded-xl">
                <div className="bg-white bg-opacity-10 p-4 rounded-full">
                  <Curate h="48" w="48" />
                </div>
                <div className="flex flex-col gap-4 w-4/5">
                  <h1 className="text-2xl font-semibold">Build Your Tribe</h1>
                  <p className="">Find people who share your passions.</p>
                  <p className="text-gray-500">
                    🤝 Join discussions, make connections, and grow your circle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#141414] w-full flex justify-center relative">
        <svg
          id="reviews"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          fill="#191919"
          className="absolute top-0 left-0"
        >
          <path
            d="M0 0v100c250 0 375-24 500-48 125 24 250 48 500 48V0H0Z"
            opacity=".5"
          ></path>
          <path d="M0 0v4c250 0 375 24 500 48C625 28 750 4 1000 4V0H0Z"></path>
        </svg>
        <div className="w-[75rem] mt-80 mb-[20rem]">
          <h2 className="text-xs uppercase leading-[0.1rem] text-orange-500 font-semibold">
            Our reviews
          </h2>
          <div className="flex justify-between">
            <h1 className="text-[3rem] font-bold my-4 w-1/3 leading-[3rem]">
              Check out the reviews. From the users of this website.
            </h1>
            <div className="w-2/5 flex flex-col gap-4 items-start">
              <p className="text-gray-400 text-lg">
                Hear what our community has to say! Users love how easy it is to
                share their thoughts, engage with content, and connect with
                others. From inspiring stories to thought-provoking ideas, this
                platform is built for authentic interaction. Dive into the
                reviews and see why so many people are enjoying the experience!
              </p>
              <div className="flex w-full justify-between">
                <Link to="/feed?page=1">
                  <button className="bg-purple-500 hover:bg-orange-500 py-2 px-8 rounded-[2rem] hover:rounded-none transition-all">
                    Go to Feed
                  </button>
                </Link>
                <div className="flex gap-4">
                  <button
                    onClick={scrollLeft}
                    className="bg-white bg-opacity-5 hover:bg-opacity-10 px-6 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="rotate-180"
                    >
                      <path
                        fill="currentColor"
                        d="M14 16.94v-4H5.08l-.03-2.01H14V6.94l5 5Z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={scrollRight}
                    className="bg-white bg-opacity-5 hover:bg-opacity-10 px-6 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M14 16.94v-4H5.08l-.03-2.01H14V6.94l5 5Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Reviews ref={scrollRef} />
        </div>
      </section>
      <section className="bg-[#101010] w-full flex justify-center relative">
        <svg
          className="absolute top-0 left-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          fill="#141414"
        >
          <path
            d="M500 80.7C358 68 0 4 0 4V0h1000v84.7c-216 23.3-358 8.6-500-4Z"
            opacity=".3"
          ></path>
          <path
            d="M500 65.7C358 53 0 4 0 4V0h1000v62.7c-216 23.3-358 15.6-500 3Z"
            opacity=".5"
          ></path>
          <path d="M500 50.7C358 38 0 4 0 4V0h1000v40.7C784 64 642 63.3 500 50.7Z"></path>
        </svg>
        <div className="w-[75rem] mt-80 mb-[20rem] flex justify-between">
          <div className="w-1/3">
            <h2 className="text-xs uppercase leading-[0.1rem] text-orange-500 font-semibold">
              Our reviews
            </h2>
            <h1 className="text-[3rem] font-bold my-4 leading-[3rem]">
              How about a review? Give us some of your feedback!
            </h1>
            <p className="text-gray-400 text-lg mt-20">
              Hear what our community has to say! Users love how easy it is to
              share their thoughts, engage with content, and connect with
              others. From inspiring stories to thought-provoking ideas, this
              platform is built for authentic interaction. Dive into the reviews
              and see why so many people are enjoying the experience!
            </p>
          </div>
          <div className="w-2/5 flex justify-center">
            <ReviewForm user={user} />
          </div>
        </div>
      </section>
      <footer className=" bg-[#070707] w-full flex justify-center relative text-gray-400">
        <svg
          className="absolute top-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 100"
          fill="#101010"
        >
          <path d="M0 0v84l500 16 500-16V0H0z" opacity=".2"></path>
          <path d="M0 0v64l500 36 500-36V0H0z" opacity=".4"></path>
          <path d="M0 0v44l500 56 500-56V0H0z" opacity=".4"></path>
          <path d="M0 0v24l500 76 500-76V0H0z" opacity=".5"></path>
          <path d="M0 0v4l500 96 500-96V0H0z"></path>
        </svg>
        <div className="w-[90%] md:w-[45rem] lg:w-[60rem] xl:w-[75rem] mt-80">
          <h1 className="text-[1.5rem] lg:text-[3rem] leading-normal lg:leading-[3rem] font-bold text-center">
            A vibrant and inclusive community of solvers and challengers.
          </h1>
          <p className="text-xl lg:text-3xl font-bold text-center my-8">
            Learn more now!
          </p>
          <div className="w-full flex flex-col lg:flex-row py-20 justify-between">
            <div className="w-full lg:w-2/5">
              <h1 className="font-semibold text-lg lg:text-2xl">
                <span
                  data-english="Puzzle Solver's Hub"
                  data-srpski="Кутак за решавање загонетки"
                >
                  Puzzle Solver's Hub
                </span>
              </h1>
              <p className="py-4 text-gray-300 text-sm lg:text-lg text-semibold">
                <span
                  data-english="Your ultimate resource for solving puzzles of all kinds."
                  data-srpski="Ваш најбољи ресурс за решавање свих врста загонетки."
                >
                  Your ultimate resource for solving puzzles of all kinds.
                </span>
              </p>
              <p className="py-4 text-gray-300 text-xs lg:text-[1rem] text-semibold">
                <span
                  data-english="Join us at the Puzzle Solver's Hub, where puzzle enthusiasts and experts come together to share tips, tricks, and solutions."
                  data-srpski="Придружите нам се у Кутку за решавање загонетки, где љубитељи и стручњаци деле савете, трикове и решења."
                >
                  Join us at the Puzzle Solver's Hub, where puzzle enthusiasts
                  and experts come together to share tips, tricks, and
                  solutions.
                </span>
                <span
                  data-english="Explore strategies, connect with a vibrant community, and enhance your problem-solving skills."
                  data-srpski="Истражите стратегије, повежите се са живописном заједницом и унапредите своје вештине решавања проблема."
                >
                  Explore strategies, connect with a vibrant community, and
                  enhance your problem-solving skills.
                </span>
                <span
                  data-english="Visit our site for more details and feel free to contact us anytime!"
                  data-srpski="Посетите нашу страницу за више детаља и слободно нас контактирајте у било ком тренутку!"
                >
                  Visit our site for more details and feel free to contact us
                  anytime!
                </span>
              </p>
            </div>
            <div className="flex my-8 lg:my-0 gap-10 lg:gap-20 flex-col lg:flex-row">
              <div className="flex flex-col sm:flex-row lg:flex-col justify-between lg:justify-normal gap-4 lg:gap-10">
                <div className="flex w-1/2 lg:w-auto gap-3 h-20">
                  <div className="bg-black bg-opacity-20 rounded-full p-2 lg:p-4 flex justify-center items-center h-10 w-10 lg:w-20 lg:h-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                      className=""
                    >
                      <path
                        fill="currentColor"
                        d="M19.5 22a1.5 1.5 0 0 0 1.5-1.5V17a1.5 1.5 0 0 0-1.5-1.5c-1.17 0-2.32-.18-3.42-.55a1.51 1.51 0 0 0-1.52.37l-1.44 1.44a14.77 14.77 0 0 1-5.89-5.89l1.43-1.43c.41-.39.56-.97.38-1.53c-.36-1.09-.54-2.24-.54-3.41A1.5 1.5 0 0 0 7 3H3.5A1.5 1.5 0 0 0 2 4.5C2 14.15 9.85 22 19.5 22M3.5 4H7a.5.5 0 0 1 .5.5c0 1.28.2 2.53.59 3.72c.05.14.04.34-.12.5L6 10.68c1.65 3.23 4.07 5.65 7.31 7.32l1.95-1.97c.14-.14.33-.18.51-.13c1.2.4 2.45.6 3.73.6a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-.5.5C10.4 21 3 13.6 3 4.5a.5.5 0 0 1 .5-.5"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-start lg:justify-between">
                    <p className="text-yellow-400 tracking-[0.2rem] text-[0.5rem] lg:text-[0.7rem] font-semibold">
                      <span data-english="PHONE" data-srpski="ТЕЛЕФОН">
                        PHONE
                      </span>
                    </p>
                    <p className="text-sm md:text-[1rem] lg:text-lg font-semibold">
                      <span
                        data-english="+381 (063) 303 309"
                        data-srpski="+381 (063) 303 309"
                      >
                        +381 (063) 303 309
                      </span>
                    </p>
                    <p className="text-sm md:text-[1rem] lg:text-lg font-semibold">
                      <span
                        data-english="+381 (063) 303 309"
                        data-srpski="+381 (063) 303 309"
                      >
                        +381 (063) 303 309
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex w-1/2 lg:w-auto gap-3 h-20">
                  <div className="bg-black bg-opacity-20 rounded-full p-2 lg:p-4 flex justify-center items-center h-10 w-10 lg:w-20 lg:h-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                      className=""
                    >
                      <path
                        fill="currentColor"
                        d="M5 5h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1c-.5 0-.94.17-1.28.47l7.78 5.03l7.78-5.03C18.94 6.17 18.5 6 18 6zm6.5 6.71L3.13 7.28C3.05 7.5 3 7.75 3 8v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8c0-.25-.05-.5-.13-.72z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-start lg:justify-between">
                    <p className="text-yellow-400 tracking-[0.2rem] text-[0.5rem] lg:text-[0.7rem] font-semibold">
                      <span data-english="EMAIL" data-srpski="ЕМАЈЛ">
                        EMAIL
                      </span>
                    </p>
                    <p className="text-sm md:text-[1rem] lg:text-lg font-semibold">
                      <span
                        data-english="muricamar2004@gmail.com"
                        data-srpski="muricamar2004@gmail.com"
                      >
                        muricamar2004@gmail.com
                      </span>
                    </p>
                    <p className="text-sm md:text-[1rem] lg:text-lg font-semibold">
                      <span
                        data-english="muricamar2004@gmail.com"
                        data-srpski="muricamar2004@gmail.com"
                      >
                        muricamar2004@gmail.com
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col justify-between lg:justify-normal gap-4 lg:gap-10">
                <div className="flex w-1/2 lg:w-auto gap-3 h-20">
                  <div className="bg-black bg-opacity-20 rounded-full p-2 lg:p-4 flex justify-center items-center h-10 w-10 lg:w-20 lg:h-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 256 256"
                      className=""
                    >
                      <path
                        fill="currentColor"
                        d="M154.7 142.75a36 36 0 1 0-37.4 0a63.6 63.6 0 0 0-32.5 22.85a4 4 0 0 0 6.4 4.8a56 56 0 0 1 89.6 0a4 4 0 0 0 6.4-4.8a63.65 63.65 0 0 0-32.5-22.85M108 112a28 28 0 1 1 28 28a28 28 0 0 1-28-28m100-84H64a12 12 0 0 0-12 12v28H32a4 4 0 0 0 0 8h20v48H32a4 4 0 0 0 0 8h20v48H32a4 4 0 0 0 0 8h20v28a12 12 0 0 0 12 12h144a12 12 0 0 0 12-12V40a12 12 0 0 0-12-12m4 188a4 4 0 0 1-4 4H64a4 4 0 0 1-4-4V40a4 4 0 0 1 4-4h144a4 4 0 0 1 4 4Z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col justify-start lg:justify-between">
                    <p className="text-yellow-400 tracking-[0.2rem] text-[0.5rem] lg:text-[0.7rem] font-semibold">
                      <span data-english="ADDRESS" data-srpski="АДРЕСА">
                        ADDRESS
                      </span>
                    </p>
                    <p className="text-sm md:text-[1rem] lg:text-lg font-semibold">
                      <span data-english="Serbia," data-srpski="Србија,">
                        Serbia,
                      </span>
                    </p>
                    <p className="text-sm md:text-[1rem] lg:text-lg font-semibold">
                      <span data-english="Novi Pazar" data-srpski="Нови Пазар">
                        Novi Pazar
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex w-1/2 lg:w-auto gap-3 h-20">
                  <div className="bg-black bg-opacity-20 rounded-full p-2 lg:p-4 flex justify-center items-center h-10 w-10 lg:w-20 lg:h-20">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="2em"
                      height="2em"
                      viewBox="0 0 24 24"
                      className=""
                    >
                      <g
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      >
                        <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5M7 17v-7" />
                        <path d="M11 17v-3.25M11 10v3.75m0 0c0-3.75 6-3.75 6 0V17M7 7.01l.01-.011" />
                      </g>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-start lg:justify-between">
                    <p className="text-yellow-400 tracking-[0.2rem] text-[0.5rem] lg:text-[0.7rem] font-semibold">
                      <span data-english="LINKEDIN" data-srpski="ЛИНКЕДИН">
                        LINKEDIN
                      </span>
                    </p>
                    <p className="text-sm md:text-[1rem] lg:text-lg font-semibold">
                      <span data-english="Amar Muric" data-srpski="Амар Мурић">
                        Amar Muric
                      </span>
                    </p>
                    <p className="text-sm md:text-[1rem] lg:text-lg font-semibold">
                      <span data-english="Amar Muric" data-srpski="Амар Мурић">
                        Amar Muric
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col lg:flex-row py-20 border-y-2 border-[#191919]">
            <div className="w-full lg:w-[40%]">
              <div className="flex gap-2 items-center">
                <Link to="/" className="h-full flex items-center">
                  <img className="h-[5rem]" src={logo} alt="Logo" />
                  <div>
                    <p className="playwrite font-bold text-lg">Fullstack</p>
                    <p className="text-sm text-gray-500">MERN Website</p>
                  </div>
                </Link>
              </div>
              <p className="text-sm lg:text-[1rem] my-4 text-gray-200">
                <span
                  data-english="Join us at the Puzzle Solver's Hub, the premier online community for puzzle enthusiasts. Explore new challenges, share your expertise, and connect with fellow solvers. Feel free to contact us anytime for more details!"
                  data-srpski="Придружите нам се у Кутку за решавање загонетки, водећој онлајн заједници за љубитеље загонетки. Истражите нове изазове, поделите своју стручност и повежите се са другим решавачима. Слободно нас контактирајте у било ком тренутку за више детаља!"
                >
                  Join us at the Puzzle Solver's Hub, the premier online
                  community for puzzle enthusiasts. Explore new challenges,
                  share your expertise, and connect with fellow solvers. Feel
                  free to contact us anytime for more details!
                </span>
              </p>
            </div>
            <div className="w-full lg:w-[40%] flex lg:justify-around justify-between my-8 lg:my-0">
              <div>
                <h1 className="font-semibold text-xl lg:text-3xl">
                  <span data-english="Navigation" data-srpski="Навигација">
                    Navigation
                  </span>
                </h1>
                <div className="bg1 w-8 h-[0.2rem] my-3 bg-purple-500"></div>
                <ul className="flex flex-col gap-3 text-gray-200 font-semibold text-sm lg:text-[1rem]">
                  <li data-english="About Us" data-srpski="О нама">
                    About Us
                  </li>
                  <li data-english="Schedule" data-srpski="Распоред">
                    Schedule
                  </li>
                  <li data-english="Speakers" data-srpski="Говорници">
                    Speakers
                  </li>
                  <li data-english="Sponsors" data-srpski="Спонзори">
                    Sponsors
                  </li>
                </ul>
              </div>
              <div>
                <h1 className="font-semibold text-xl lg:text-3xl">
                  <span data-english="Support" data-srpski="Подршка">
                    Support
                  </span>
                </h1>
                <div className="bg1 w-8 h-[0.2rem] my-3 bg-orange-500"></div>
                <ul className="flex flex-col gap-3 text-gray-200 font-semibold text-sm lg:text-[1rem]">
                  <li data-english="Pricing" data-srpski="Цене">
                    Pricing
                  </li>
                  <li
                    data-english="Help & Support"
                    data-srpski="Помоћ и подршка"
                  >
                    Help & Support
                  </li>
                  <li
                    data-english="Privacy Policy"
                    data-srpski="Политика приватности"
                  >
                    Privacy Policy
                  </li>
                  <li data-english="Contacts" data-srpski="Контакти">
                    Contacts
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full lg:w-[20%] flex flex-col justify-between gap-4 lg:gap-0">
              <h1 className="font-semibold text-xl lg:text-3xl">
                <span data-english="Subscribe" data-srpski="Претплатите се">
                  Subscribe
                </span>
              </h1>
              <input
                className="p-6 w-full bg-black bg-opacity-20"
                type="email"
                placeholder="Email*"
              />
              <button className="bg-purple-500 hover:bg-orange-500 text-white py-4 px-10 w-full bg1 rounded-[2rem] hover:rounded-none transition-all">
                <span data-english="Subscribe" data-srpski="Претплатите се">
                  Subscribe
                </span>
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center py-8">
            <span className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                >
                  <path d="M14 15.667a4.5 4.5 0 0 1-1.714.333C9.919 16 8 14.21 8 12s1.919-4 4.286-4c.61 0 1.189.119 1.714.333" />
                  <path d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
                </g>
              </svg>
              <p>
                <span data-english="Created by Amar" data-srpski="Креирао Амар">
                  Created by Amar
                </span>
              </p>
            </span>
            <p>
              <span
                data-english="All rights Reserved"
                data-srpski="Сва права задржана"
              >
                All rights Reserved
              </span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default App;
