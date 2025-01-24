// External Libraries
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

// Components
import ReviewForm from "./fsp/frontend/src/components/Reviews/ReviewForm";
import Reviews from "./fsp/frontend/src/components/Reviews/Reviews";

// Utilities
import { fetchData } from "./fsp/frontend/src/utility/async";

// Assets: Logos and Images
import FrontendImg from "./assets/frontend.png";
import BackendImg from "./assets/backend.png";
import DatabaseImg from "./assets/database.png";
import SecurityImg from "./assets/security.png";

// Assets: Icons
import {
  Bookmarks,
  Chart,
  Create,
  Curate,
  Engage,
  Find,
  Illustration2,
  Likes,
  Post,
  ReviewIcon,
  Star,
  Stats,
  User,
} from "./fsp/frontend/src/assets/icons";
import Statistic from "./fsp/frontend/src/components/Statistic";
import Section from "./fsp/frontend/src/components/Section";
import ScrollingLogos from "./fsp/frontend/src/components/ScrollingLogos";
import { logos } from "./fsp/frontend/src/components/Logos";
import Footer from "./fsp/frontend/src/components/Footer";
import Title from "./fsp/frontend/src/components/Title";
import Preheading from "./fsp/frontend/src/components/Preheading";
import Text from "./fsp/frontend/src/components/Text";
import Button from "./fsp/frontend/src/components/Button";
import FadeIn from "./fsp/frontend/src/components/FadeIn";

const App = () => {
  const { user } = useSelector((state) => state.auth);
  const scrollRef = useRef(null);

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

  return (
    <main className="bg-[#222] overflow-x-hidden text-white flex flex-col items-center justify-center h-auto min-h-screen w-full">
      <div className="absolute w-[700px] z-10 h-[700px] top-[12em] right-48 bg-purple-500 bg-opacity-80 rounded-2xl slimy-effect"></div>
      <div className="absolute z-10 top-80 right-32 rounded-2xl">
        <Illustration2 w="720" h="420" />
      </div>
      <Section bg="[#222]" className="bg1 pt-60 pb-20">
        <Title className="flex text-[4rem]">
          A{" "}
          <span className="bg-purple-500 mx-2 flex -skew-x-12 rounded-xl">
            <p className="px-2 mb-2 skew-x-12">cozy place</p>
          </span>{" "}
          to
          <br />
        </Title>
        <Title className="text-[4rem]">share anything you like!</Title>
        <Text className="w-1/2 leading-7">
          <span className="font-semibold text-lg">
            What are you waiting for?
          </span>{" "}
          <br /> Let’s create a post and share what inspires you. Whether it’s a
          hobby, an idea, or something you’re passionate about, your story
          matters. <br />
          Take the first step—your voice could encourage someone else or start a
          meaningful connection!
        </Text>
        <h1 className="mt-10 mb-4 font-semibold text-sm">Technologies used:</h1>
        <ScrollingLogos
          items={logos}
          animationClass="animate-scroll-right-half"
          containerClass="overflow-hidden w-1/2"
        />
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
      </Section>

      <section className="half-transparent h-20 bg2 w-full flex justify-center relative -top-20"></section>
      <Section
        className="h-40"
        containerClass="flex justify-between items-center"
      >
        <div className="w-1/5 flex gap-6">
          <img
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
            src={FrontendImg}
            alt="Frontend"
          />
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-semibold text-lg">Frontend Stack</p>
              <p className="text-sm text-gray-500">7 Technologies Used</p>
            </div>
            <p className="text-xs text-gray-400 line-clamp-4">
              React, Tailwind, Redux, React Query, Axios, React Router DOM,
              Socket.io Client
            </p>
          </div>
        </div>
        <div className="w-1/5 flex gap-6">
          <img
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
            src={BackendImg}
            alt="Backend"
          />
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-semibold text-lg">Backend Stack</p>
              <p className="text-sm text-gray-500">6 Technologies Used</p>
            </div>
            <p className="text-xs text-gray-400 line-clamp-4">
              Node.js, Express.js, Multer, JWT, Socket.io, Axios
            </p>
          </div>
        </div>
        <div className="w-1/5 flex gap-6">
          <img
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
            src={DatabaseImg}
            alt="Database"
          />
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-semibold text-lg">Database Stack</p>
              <p className="text-sm text-gray-500">2 Technologies Used</p>
            </div>
            <p className="text-xs text-gray-400 line-clamp-2">
              MongoDB, Mongoose
            </p>
          </div>
        </div>
        <div className="w-1/5 flex gap-6">
          <img
            className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md"
            src={SecurityImg}
            alt="Security"
          />
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-semibold text-lg">Security Stack</p>
              <p className="text-sm text-gray-500">4 Technologies Used</p>
            </div>
            <p className="text-xs text-gray-400 line-clamp-2">
              JWT, Axios, Multer, Bcrypt
            </p>
          </div>
        </div>
      </Section>

      <Section
        className="pt-80"
        bg="[#191919]"
        svg={
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
        }
      >
        <Preheading>About thisds website</Preheading>
        <Title>What is this about?</Title>
        <Text className="text-gray-400 w-2/3">
          Welcome to our platform, where sharing your thoughts has never been
          easier! Create an account, share your ideas, and connect with others
          through posts. Engage with the community by liking and bookmarking
          content that inspires you. Whether you're here to express yourself or
          discover something new, this is the space for meaningful connections.
        </Text>
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
                <p>Got something to say? Share it with the world.</p>
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
                <p className="">Support creators by reacting to their posts.</p>
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
        <FadeIn className="flex justify-between mt-20 mb-40">
          <Statistic
            title="No. of Users"
            icon={<User h="48px" w="48px" />}
            url="/users/count"
            bgColor="bg-purple-500"
            id="users"
          />
          <Statistic
            title="No. of Posts"
            icon={<Post h="48px" w="48px" />}
            url="/posts/count"
            bgColor="bg-orange-500"
            id="posts"
          />
          <Statistic
            title="No. of Likes"
            icon={<Likes h="48px" w="48px" />}
            url="/posts/likes"
            bgColor="bg-purple-500"
            id="likes"
          />
          <Statistic
            title="No. of Bookmarks"
            icon={<Bookmarks h="48px" w="48px" />}
            url="/posts/bookmarks"
            bgColor="bg-orange-500"
            id="bookmarks"
          />
        </FadeIn>
      </Section>

      <Section
        className="pt-80"
        bg="[#141414]"
        svg={
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
        }
      >
        <Preheading>Our reviews</Preheading>
        <div className="flex justify-between">
          <div className="w-1/3">
            <Title>
              Check out the reviews. From the users of this website.
            </Title>
          </div>
          <div className="w-2/5 flex flex-col gap-4 items-start">
            <Text>
              Hear what our community has to say! Users love how easy it is to
              share their thoughts, engage with content, and connect with
              others. From inspiring stories to thought-provoking ideas, this
              platform is built for authentic interaction. Dive into the reviews
              and see why so many people are enjoying the experience!
            </Text>
            <p className="text-gray-400 text-lg"></p>
            <div className="flex w-full justify-between">
              <Link to="/feed">
                <Button className="px-8 py-2">Go to Feed</Button>
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
        <FadeIn className="flex justify-between mt-20 mb-40">
          <Statistic
            title="No. of Reviews"
            icon={<ReviewIcon h="48px" w="48px" />}
            url="/reviews/count"
            bgColor="bg-purple-500"
            id="reviews"
          />
          <Statistic
            title="Avg. Rating"
            icon={<Chart h="48px" w="48px" />}
            url="/reviews/average"
            bgColor="bg-blue-500"
            id="avgRating"
          />
          <Statistic
            title="Most given Rating"
            icon={<Star h="48px" w="48px" />}
            url="/reviews/most-rated"
            bgColor="bg-purple-500"
            id="mostGivenRating"
          />
          <Statistic
            title="% of Anon. Reviews"
            icon={<Stats h="48px" w="48px" />}
            url="/reviews/anonymous-percentage"
            bgColor="bg-orange-500"
            id="anonReviews"
          />
        </FadeIn>
      </Section>

      <Section
        className="pt-80"
        bg="purple-500"
        svg={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 100"
            fill="#141414"
            className="absolute top-0"
          >
            <path
              d="M0 0v100c166.7 0 166.7-66 333.3-66S500 77 666.7 77 833.3 28 1000 28V0H0Z"
              opacity=".5"
            ></path>
            <path
              d="M0 0v100c166.7 0 166.7-66 333.3-66S500 70 666.7 70 833.3 16 1000 16V0H0Z"
              opacity=".5"
            ></path>
            <path d="M0 0v100c166.7 0 166.7-66 333.3-66S500 63 666.7 63 833.3 4 1000 4V0H0Z"></path>
          </svg>
        }
      >
        <div className="flex justify-between">
          <div className="w-1/3">
            <Preheading>Our reviews</Preheading>
            <Title>How about a review? Give us some of your feedback!</Title>
            <Text className="mt-20 text-gray-800">
              We’d love to hear from you! Your thoughts, feedback, and
              experiences help us make this platform even better. Whether it’s a
              feature you love, an idea you’d like to share, or a way we can
              improve, your input matters. Share your review today and let
              others know what makes this platform special to you. Together, we
              can create an even better experience!
            </Text>
          </div>
          <div className="w-2/5 flex justify-center">
            <ReviewForm user={user} />
          </div>
        </div>
        <ScrollingLogos
          items={logos}
          containerClass="overflow-hidden w-full mt-20"
        />
      </Section>
      <Footer />
    </main>
  );
};

export default App;
