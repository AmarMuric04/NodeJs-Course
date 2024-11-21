import logo from "./assets/logo.png";
import rcube from "./assets/rcube.png";
import what from "./assets/what.svg";
import time from "./assets/time.svg";
import light from "./assets/light.svg";
import stats from "./assets/stats.svg";
import trophy from "./assets/trophy.svg";
import tup from "./assets/tup.svg";
import creativ from "./assets/creativ.svg";
import bank from "./assets/bank.svg";

function App() {
  return (
    <div className="bg-[#b700ff] w-full h-full relative">
      <header className="bg-[#a600e7] absolute top-0 left-0 right-0 py-4 px-[25rem] flex justify-between items-center">
        <section className="flex gap-3">
          <img className="h-10" src={logo} />
          <div className="flex flex-col justify-between">
            <h1 className="text-white font-extrabold text-xl tracking-[0.2rem]">
              SOLVEIT
            </h1>
            <p className="text-gray-300 text-[0.6rem]">HELP & FEEDBACK</p>
          </div>
        </section>
        <section>
          <ul className="flex gap-10 text-white">
            <li>About</li>
            <li>Categories</li>
            <li>Sponsors</li>
            <li>Contacts</li>
            <li>Credits</li>
          </ul>
        </section>
        <section className="flex items-center justify-between gap-4">
          <button className="border-b-2 py-2 text-white px-10">Sign Up</button>
          <button className="text-purple-600 bg-white py-2 px-10 rounded-[2rem] transition-all hover:rounded-none">
            Sign In
          </button>
        </section>
      </header>
      <main className="h-screen px-[25rem] relative z-50">
        <div className="relative z-50 pt-48 h-full">
          <p className="uppercase text-[#ffd100] text-[0.7rem] tracking-[0.2rem]">
            Welcome to solveit
          </p>
          <h1 className="text-[4rem] text-white leading-none font-semibold tracking-wide mt-8">
            Where <span className="text-pink-600 ">problems</span> <br></br>{" "}
            meet solutions<span className="text-cyan-400">.</span>
          </h1>
          <p className="leading-7 text-white mt-16 text-xl">
            Join us at the NY Technology, Design & Innovation <br></br>{" "}
            Conference, the premier gathering of visionaries on <br></br>{" "}
            <span className="text-[#ffd100] font-bold">
              September 17-18, 2024.
            </span>
          </p>
          <p className="text-gray-400 underline cursor-pointer mt-10">
            20+ Trusted Partners
          </p>
          <div className="flex gap-4 mt-40">
            <button className="py-4 px-10 bg-[#ffd100] text-white rounded-[2rem] hover:rounded-none transition-all">
              Buy a ticket
            </button>
            <button className="text-[#ffd100] cursor-pointer hover:underline italic">
              Discover the schedule
            </button>
          </div>
          <ul className="flex gap-3 mt-48 text-[0.8rem] text-[#ffd100]">
            <li className="underline cursor-pointer">INSTAGRAM</li>
            <li className="underline cursor-pointer">FACEBOOK</li>
            <li className="underline cursor-pointer">GITHUB</li>
            <li className="ml-80">LINKEDIN</li>
          </ul>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#bc0fff"
          width="400"
          height="400"
          className="absolute top-28 left-10 z-0"
        >
          <path d="M480 240H0a240 240 0 1 1 480 0ZM480 480H0a240 240 0 1 1 480 0Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#bc0fff"
          width="300"
          height="300"
          className="absolute top-[7.5rem] left-[38rem] z-0"
          viewBox="0 0 480 480"
        >
          <path d="M480 120 360 0 240 120 120 0 0 120l120 120L0 360l120 120 120-120 120 120 120-120-120-120 120-120z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#c326ff"
          width="250"
          height="250"
          className="absolute top-20 right-80 z-0"
        >
          <path d="m353.1 240 56.6-56.6a80 80 0 0 0-61-136.4H131.3a79.8 79.8 0 0 0-61 136.4l56.6 56.6-56.6 56.6a80 80 0 0 0 61 136.4h217.4a79.8 79.8 0 0 0 61-136.4L353.1 240Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#bc0fff"
          width="600"
          height="600"
          className="absolute bottom-4 right-[50rem] z-0"
        >
          <path d="M0 0v240L240 0H0zM480 480V240L240 480h240zM240 240h240L240 0v240zM240 240H0l240 240V240z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#bc0fff"
          width="300"
          height="300"
          className="absolute top-28 left-[65rem]"
          viewBox="0 0 480 480"
        >
          <path d="M0 0v120a360 360 0 0 1 360 360h120A480 480 0 0 0 0 0Z"></path>
          <path d="M0 240v120a120 120 0 0 1 120 120h120A240 240 0 0 0 0 240Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#bc0fff"
          width="300"
          height="300"
          className="absolute bottom-10 left-10"
        >
          <path d="M480 240H240V0a240 240 0 0 1 240 240ZM240 480H0V240a240 240 0 0 1 240 240ZM480 480H240V240a240 240 0 0 1 240 240ZM240 240H0V0a240 240 0 0 1 240 240Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#bc0fff"
          width="400"
          height="400"
          className="absolute bottom-10 right-10"
        >
          <path d="M480 210H352l110.9-64-30-52L322 158l64-110.8-52-30L270 128V0h-60v128L146 17.2l-52 30L158 158 47.2 94l-30 52L128 210H0v60h128L17.2 334l30 52L158 322 94 432.9l52 30L210 352v128h60V352l64 110.9 52-30L322 322l110.9 64 30-52L352 270h128v-60z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#f3b60c"
          width="300"
          height="300"
          className="absolute bottom-20 right-60  opacity-80"
        >
          <path d="M409.7 409.7c33.2-33.2 23.8-100.2-17.9-169.7 41.7-69.6 51.1-136.5 18-169.7C376.4 37 309.4 46.5 240 88.2 170.4 46.5 103.5 37 70.3 70.2 37 103.6 46.5 170.5 88.2 240c-41.7 69.5-51.1 136.5-18 169.7 33.3 33.2 100.2 23.8 169.8-17.9 69.5 41.7 136.5 51.1 169.7 18Z"></path>
          <img className="bg-red-400" src={rcube} />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#f70845"
          width="200"
          height="200"
          className="absolute top-48 right-[30rem] opacity-80"
        >
          <rect width="480" height="480" rx="120" ry="120"></rect>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#10ccef"
          width="250"
          height="250"
          className="absolute top-[30rem] right-[50rem] opacity-80"
        >
          <path d="M409 295.9a79 79 0 0 1 .7-112.5A80 80 0 0 0 296.6 70.3 79 79 0 0 1 184 71a80.7 80.7 0 0 0-113.4-1.1C39 101 39 152 70.3 183.4s30.5 82.7.7 112.5a80.7 80.7 0 0 0-1.1 113.4 80 80 0 0 0 113.5.4 79 79 0 0 1 113.2 0 80 80 0 0 0 113.5-.4c31-31.4 30-82.2-1.1-113.4Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#10ccef"
          width="75"
          height="75"
          className="absolute rotate-[20deg] top-[10rem] right-[65rem] opacity-80"
        >
          <path d="M360 289.7c43.4 0 86.9-16.6 120-49.7a169.2 169.2 0 0 0-120-49.7 169.2 169.2 0 0 0 49.7-120c-46.9 0-89.3 19-120 49.7 0-43.4-16.6-86.9-49.7-120a169.2 169.2 0 0 0-49.7 120 169.2 169.2 0 0 0-120-49.7c0 46.8 19 89.3 49.7 120-43.4 0-86.9 16.6-120 49.7a169.2 169.2 0 0 0 120 49.7 169.2 169.2 0 0 0-49.7 120c46.8 0 89.3-19 120-49.7 0 43.4 16.6 86.9 49.7 120a169.2 169.2 0 0 0 49.7-120 169.2 169.2 0 0 0 120 49.7c0-46.9-19-89.3-49.7-120Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#f70845"
          width="75"
          height="75"
          className="absolute top-[25rem] right-[20rem] opacity-80"
        >
          <path d="M371.3 294.4 480 240l-108.7-54.4 38.4-115.3-115.3 38.4L240 0l-54.4 108.7L70.3 70.3l38.4 115.3L0 240l108.7 54.4-38.4 115.3 115.3-38.4L240 480l54.4-108.7 115.3 38.4-38.4-115.3z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#f3b60c"
          width="75"
          height="75"
          className="absolute bottom-20 right-[45rem] opacity-80"
        >
          <circle cx="240" cy="240" r="240"></circle>
        </svg>
      </main>
      <section className="bg-[#ffd100] px-[25rem] w-full flex justify-between items-center py-6">
        <ul className="flex justify-between w-full">
          <li className="flex items-center w-1/4 font-thin text-gray-500 gap-2">
            <img className="w-20 h-20" src={what} />
            <div className="flex flex-col">
              <h1 className="font-bold text-2xl text-black">What to expect?</h1>
              <p className="text-gray-700">SOLVEIT brigs experts together.</p>
            </div>
          </li>
          <li className="flex items-center w-1/5 font-thin text-gray-500 gap-2">
            <img className="w-20 h-20" src={light} />
            <p>Engaging solutions and feedback</p>
          </li>
          <li className="flex items-center w-1/5 font-thin text-gray-500 gap-2">
            <img className="w-20 h-20" src={time} />
            <p>Quick and simple solutions</p>
          </li>
          <li className="flex items-center w-1/5 font-thin text-gray-500 gap-2">
            <img className="w-20 h-20" src={stats} />
            <p>Overwhelmingly good reviews</p>
          </li>
        </ul>
      </section>
      <section className="w-full px-[25rem] pb-40 flex flex-col items-center pt-32">
        <h1 className="text-4xl font-bold text-white text-center w-2/3">
          SolveIt is a dynamic <span className="text-pink-600">online hub</span>{" "}
          dedicated to puzzles,{" "}
          <span className="text-cyan-400">problem-solving</span>, and{" "}
          <span className="text-[#ffd100]">brain-teasing</span> challenges
          <span className="text-[#ffd100]">.</span>
        </h1>
        <p className="text-center pt-8 text-lg text-gray-300 w-2/3">
          Bringing together enthusiasts of Sudoku, Rubik's Cube, logic puzzles,
          and more, SolveIt fosters a friendly and engaging community for puzzle
          lovers worldwide. It's all about sharpening your mind, tackling new
          challenges, and finding creative solutions. On SolveIt, you’ll
          discover expert tips, step-by-step tutorials, and a treasure trove of
          resources designed to help you master your favorite puzzles and
          explore new ones. Whether you're a beginner or a seasoned solver,
          SolveIt is the ultimate destination for unlocking your problem-solving
          potential.
        </p>
        <div className="mt-20">
          <h1 className="text-center text-gray-600 text-xl">Active since</h1>
          <p className="text-white text-4xl font-bold">
            21st <span className="text-gray-600 font-thin">|</span> November{" "}
            <span className="text-gray-600 font-thin">|</span> 2024.
          </p>
        </div>
      </section>
      <section className="polygon bg-purple-200 w-full px-[25rem] py-40">
        <p className="text-[0.7rem] tracking-[0.2rem] py-8">KEY CATEGORIES</p>
        <div className="flex w-full">
          <div className="w-2/3">
            <p className="text-black text-[3rem] leading-[3rem] font-bold">
              Interactive <span className="text-pink-600">lessons</span> on cool
              and
              <br></br>emerging puzzles or{" "}
              <span className="text-[#ffd100]">challenges</span>
              <span className="text-cyan-400">.</span>
            </p>
          </div>
          <ul className="w-1/3 flex flex-col justify-between">
            <li className="flex gap-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 2048 2048"
                className="text-[#ffd100]"
              >
                <path
                  fill="currentColor"
                  d="M1920 0v1920H0V0zm-358 621l-135-135l-659 658l-275-274l-135 135l410 411z"
                />
              </svg>
              <p>In-depth lessons to enhance your skills;</p>
            </li>
            <li className="flex gap-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 2048 2048"
                className="text-[#ffd100]"
              >
                <path
                  fill="currentColor"
                  d="M1920 0v1920H0V0zm-358 621l-135-135l-659 658l-275-274l-135 135l410 411z"
                />
              </svg>
              <p>Cutting-edge demonstration & solutions;</p>
            </li>
            <li className="flex gap-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 2048 2048"
                className="text-[#ffd100]"
              >
                <path
                  fill="currentColor"
                  d="M1920 0v1920H0V0zm-358 621l-135-135l-659 658l-275-274l-135 135l410 411z"
                />
              </svg>
              <p>Helping you in a fun way.</p>
            </li>
          </ul>
        </div>
        <div className="flex gap-8 w-full mt-10">
          <div className="w-1/3 h-[30rem] relative group overflow-hidden">
            <img
              className="w-full h-full transition-all duration-500 object-cover group-hover:scale-125"
              src="https://images.unsplash.com/photo-1539627831859-a911cf04d3cd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cnViaWtzJTIwY3ViZXxlbnwwfHwwfHx8MA%3D%3D"
            />{" "}
            <div className="absolute top-0 left-0 w-full h-full bg-purple-900 opacity-0 hover:opacity-90 transition-all duration-500 flex flex-col items-center justify-center text-center text-white p-4 hover-target">
              <h1 className="font-bold text-2xl">Rubik{"'"}s Cube</h1>
              <h1 className="font-bold text-xl">
                {"("}The Ultimate Puzzle{")"}
              </h1>
              <p className="mt-8">
                Join the conversation on the evolution of the Rubik's Cube,
                exploring how this iconic puzzle continues to challenge and
                inspire minds. Discover its impact on problem-solving
                techniques, speedcubing culture, and its role in education and
                beyond. Unravel the endless possibilities and see how this
                timeless puzzle will shape the future of creativity and logic.
              </p>
            </div>
          </div>
          <div className="w-1/3 h-[30rem] relative group overflow-hidden">
            <img
              className="w-full h-full transition-all duration-500 object-cover group-hover:scale-125"
              src="https://media.istockphoto.com/id/139707843/photo/sudoku.jpg?s=612x612&w=0&k=20&c=O2yRZFTcFELntjnt_1fNYS6JA5GIUxGBAhhqlWLjG6c="
            />{" "}
            <div className="absolute top-0 left-0 w-full h-full bg-purple-900 opacity-0 hover:opacity-90 transition-all duration-500 flex flex-col items-center justify-center text-center text-white p-4 hover-target">
              <h1 className="font-bold text-2xl">Sudoku</h1>
              <h1 className="font-bold text-xl">
                {"("}The Ultimate Logic Challenge{")"}
              </h1>
              <p className="mt-8">
                Join the conversation on the evolution of Sudoku, exploring how
                this timeless puzzle continues to challenge logical thinking and
                sharpen problem-solving skills. Discover its influence on
                education, cognitive development, and its growing community of
                solvers worldwide. Dive into strategies, variations, and its
                potential role in shaping future puzzle innovations.
              </p>
            </div>
          </div>
          <div className="w-1/3 h-[30rem] relative group overflow-hidden">
            <img
              className="w-full h-full transition-all duration-500 object-cover group-hover:scale-125"
              src="https://wallpaper.forfun.com/fetch/4e/4e8539373299f8b60315f64a65a0e3d0.jpeg"
            />{" "}
            <div className="absolute top-0 left-0 w-full h-full bg-purple-900 opacity-0 hover:opacity-90 transition-all duration-500 flex flex-col items-center justify-center text-center text-white p-4 hover-target">
              <h1 className="font-bold text-2xl">Other Puzzles</h1>
              <h1 className="font-bold text-xl">
                {"("}Unleash Your Inner Solver{")"}
              </h1>
              <p className="mt-8">
                Be part of the discussion on the fascinating world of puzzles
                beyond the classics. From crosswords and logic puzzles to modern
                brainteasers, explore how these challenges push the boundaries
                of creativity, logic, and ingenuity. Discover tips, tricks, and
                the ever-expanding universe of puzzles waiting to be solved.
              </p>
            </div>
          </div>
        </div>
        <ul className="flex justify-between px-20 py-16">
          <li className="flex flex-col items-center gap-4">
            <p className="text-[3.5rem] font-bold">3</p>
            <p className="text-[0.6rem] text-gray-700">WEEKS OF WORK</p>
            <div className="h-[0.7rem] w-[0.7rem] rounded-full bg-[#ffd100] mt-4"></div>
          </li>
          <li className="flex flex-col items-center gap-4">
            <p className="text-[3.5rem] font-bold">230k+</p>
            <p className="text-[0.6rem] text-gray-700">TOTAL ATTENDANCE</p>
            <div className="h-[0.7rem] w-[0.7rem] rounded-full bg-pink-600 mt-4"></div>
          </li>
          <li className="flex flex-col items-center gap-4">
            <p className="text-[3.5rem] font-bold">539</p>
            <p className="text-[0.6rem] text-gray-700">SUPPORTED PUZZLES</p>
            <div className="h-[0.7rem] w-[0.7rem] rounded-full bg-cyan-400 mt-4"></div>
          </li>
          <li className="flex flex-col items-center gap-4">
            <p className="text-[3.5rem] font-bold">4k+</p>
            <p className="text-[0.6rem] text-gray-700">
              CURRENTLY ACTIVE USERS
            </p>
            <div className="h-[0.7rem] w-[0.7rem] rounded-full bg-lime-400 mt-4"></div>
          </li>
        </ul>
      </section>
      <section className="px-[25rem] py-40">
        <p className="text-[0.7rem] tracking-[0.2rem] py-8">FEATURES</p>
        <h1 className="text-white text-[3rem] leading-[3rem] font-bold">
          Why you <span className="text-[#ffd100]">should visit</span> SolveIt
          <span className="text-pink-600">.</span>
        </h1>
        <div className="w-full mt-10 flex gap-5">
          <div className="bg-[#ffd100] w-1/3 p-8 hover:-translate-y-7 transition-all">
            <div className="w-16 h-16 bg-[#ffa100] flex items-center justify-center">
              <img className="w-4/5 h-4/5" src={trophy} />
            </div>
            <h1 className="text-[1.5rem] py-4">Inspiration</h1>
            <div className="h-[0.2rem] w-20 bg-[#ffa100] mb-4"></div>
            <p className="text-lg text-gray-700">
              Our speakers will inspire you with mind-blowing ideas supported by
              real-world-examples and stories.
            </p>
          </div>
          <div className="bg-pink-600 w-1/3 p-8 hover:-translate-y-7 transition-all">
            <div className="w-16 h-16 bg-pink-700 flex items-center justify-center">
              <img className="w-4/5 h-4/5" src={tup} />
            </div>
            <h1 className="text-[1.5rem] py-4">Community</h1>
            <div className="h-[0.2rem] w-20 bg-pink-700 mb-4"></div>
            <p className="text-lg text-gray-700">
              Become a part of the warm, respectful and intelligent community of
              entrepreneurs and innovators.
            </p>
          </div>
          <div className="bg-cyan-400 w-1/3 p-8 hover:-translate-y-7 transition-all">
            <div className="w-16 h-16 bg-cyan-500 flex items-center justify-center">
              <img className="w-4/5 h-4/5" src={creativ} />
            </div>
            <h1 className="text-[1.5rem] py-4">Challenge</h1>
            <div className="h-[0.2rem] w-20 bg-cyan-500 mb-4"></div>
            <p className="text-lg text-gray-700">
              Experience unexpected emotions, learn more about alternative
              perspectives, and discover ideas.
            </p>
          </div>
        </div>
      </section>
      <section className="polygon bg-purple-200 w-full px-[25rem] py-40">
        <p className="text-[0.7rem] tracking-[0.2rem] py-8 text-center">
          SUBSCRIPTION OPTIONS
        </p>
        <h1 className="text-[3rem] leading-[3rem] font-bold text-center">
          Choose your suitable{" "}
          <span className="text-pink-600">registration</span> package
          <span className="text-cyan-400">.</span>
        </h1>
        <p className="text-gray-700 text-lg text-center py-8">
          We offer several tickets types for your convenience.
        </p>
        <div className="w-full mt-10 flex gap-5">
          <div className="bg-cyan-400 w-1/3 p-8 hover:-translate-y-7 transition-all">
            <p className="text-[0.7rem] tracking-[0.2rem]">ONE DAY</p>
            <h1 className="text-[1.5rem] py-4">One-Day Pass / $275</h1>
            <p className="text-lg text-gray-700">
              You can choose any of the two days of the SolveIt conference
            </p>
            <ul className="flex flex-col justify-between py-8 gap-6">
              <li className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 2048 2048"
                  className="opacity-50"
                >
                  <path
                    fill="currentColor"
                    d="M1920 0v1920H0V0zm-358 621l-135-135l-659 658l-275-274l-135 135l410 411z"
                  />
                </svg>
                <p className="text-gray-700">Admission for two days;</p>
              </li>{" "}
              <li className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 2048 2048"
                  className="opacity-50"
                >
                  <path
                    fill="currentColor"
                    d="M1920 0v1920H0V0zm-358 621l-135-135l-659 658l-275-274l-135 135l410 411z"
                  />
                </svg>
                <p className="text-gray-700">Access to all stages;</p>
              </li>{" "}
              <li className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 2048 2048"
                  className="opacity-50"
                >
                  <path
                    fill="currentColor"
                    d="M1920 0v1920H0V0zm-358 621l-135-135l-659 658l-275-274l-135 135l410 411z"
                  />
                </svg>
                <p className="text-gray-700">Lunch, coffee, and afterparty.</p>
              </li>
            </ul>
            <button className="bg-gray-800 py-5 px-10 font-bold text-white">
              Buy ticket now
            </button>
          </div>
          <div className="bg-pink-600 w-1/3 p-8 hover:-translate-y-7 transition-all">
            <p className="text-[0.7rem] tracking-[0.2rem]">ALL DAYS</p>
            <h1 className="text-[1.5rem] py-4">
              Full Pass {"("}
              <span className="line-through">early</span>
              {")"} / $620
            </h1>
            <p className="text-lg text-gray-700">
              Enjoy two days of the conference by purchasing the full ticket.
            </p>
            <ul className="flex flex-col justify-between py-8 gap-6">
              <li className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 2048 2048"
                  className="opacity-50"
                >
                  <path
                    fill="currentColor"
                    d="M1920 0v1920H0V0zm-358 621l-135-135l-659 658l-275-274l-135 135l410 411z"
                  />
                </svg>
                <p className="text-gray-700">Admission for two days;</p>
              </li>{" "}
              <li className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 2048 2048"
                  className="opacity-50"
                >
                  <path
                    fill="currentColor"
                    d="M1920 0v1920H0V0zm-358 621l-135-135l-659 658l-275-274l-135 135l410 411z"
                  />
                </svg>
                <p className="text-gray-700">Access to all stages;</p>
              </li>{" "}
              <li className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 2048 2048"
                  className="opacity-50"
                >
                  <path
                    fill="currentColor"
                    d="M1920 0v1920H0V0zm-358 621l-135-135l-659 658l-275-274l-135 135l410 411z"
                  />
                </svg>
                <p className="text-gray-700">Lunch, coffee, and afterparty.</p>
              </li>
            </ul>
            <button className="bg-gray-800 py-5 px-10 font-bold text-white">
              Buy ticket now
            </button>
          </div>
          <div className="bg-[#ffd100] w-1/3 p-8 hover:-translate-y-7 transition-all">
            <p className="text-[0.7rem] tracking-[0.2rem]">ALL DAYS</p>
            <h1 className="text-[1.5rem] py-4">Early-Bird Pass / $550</h1>
            <p className="text-lg text-gray-700">
              The price is available from the day the sale starts and 2 weeks
              after.
            </p>
            <ul className="flex flex-col justify-between py-8 gap-6">
              <li className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 2048 2048"
                  className="opacity-50"
                >
                  <path
                    fill="currentColor"
                    d="M1920 0v1920H0V0zm-358 621l-135-135l-659 658l-275-274l-135 135l410 411z"
                  />
                </svg>
                <p className="text-gray-700">Admission for two days;</p>
              </li>{" "}
              <li className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 2048 2048"
                  className="opacity-50"
                >
                  <path
                    fill="currentColor"
                    d="M1920 0v1920H0V0zm-358 621l-135-135l-659 658l-275-274l-135 135l410 411z"
                  />
                </svg>
                <p className="text-gray-700">Access to all stages;</p>
              </li>{" "}
              <li className="flex items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
                  viewBox="0 0 2048 2048"
                  className="opacity-50"
                >
                  <path
                    fill="currentColor"
                    d="M1920 0v1920H0V0zm-358 621l-135-135l-659 658l-275-274l-135 135l410 411z"
                  />
                </svg>
                <p className="text-gray-700">Lunch, coffee, and afterparty.</p>
              </li>
            </ul>
            <button className="bg-gray-800 py-5 px-10 font-bold text-white">
              Buy ticket now
            </button>
          </div>
        </div>
      </section>
      <section className="px-[25rem] py-40">
        <p className="text-[#ffd100] text-[0.7rem] tracking-[0.2rem] py-8 text-center">
          TESTIMONIALS
        </p>
        <h1 className="text-white text-[3rem] leading-[3rem] font-bold text-center">
          Our <span className="text-cyan-400">users</span> about their
          experience
          <span className="text-cyan-400">.</span>
        </h1>
        <p className="text-gray-300 text-lg text-center py-8">
          Read the testimonials our users below.
        </p>
        <div className="w-full bg-white mb-12">
          <img
            className="w-1/2"
            src="https://res2.weblium.site/res/648abf34bf47350010ebfd9f/64941d5122d602000f971639_optimized_1400_c1261x904-61x44.webp"
          />
        </div>
        <div className="w-full flex gap-5">
          <div className="bg-pink-600 w-2/3 py-10 px-8 flex flex-col justify-between">
            <h1 className="text-2xl font-semibold">
              Don{"'"}t miss this opportunity to meet your tribe!
            </h1>
            <p className="text-lg text-gray-800">
              Buy your early-bird ticket for only{" "}
              <span className="font-semibold">$550</span> right now
            </p>
          </div>
          <div className="bg-cyan-400 w-1/3 py-10 px-8 flex flex-col justify-between items-center">
            <h1 className="mb-4 text-2xl font-semibold text-center">
              Buy three or more tickets and get{" "}
              <span className="text-pink-600">20% off.</span>
            </h1>
            <p className="tracking-[0.2rem] underline text-[0.6rem]">
              BUY TICKETS NOW
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-[3rem] font-bold text-white text-center mt-48">
            Have any feedback? We would{" "}
            <span className="text-pink-600">love to </span> hear it
            <span className="text-[#ffd100]">!</span>
          </h1>
          <p className="text-[#ffd110] underline font-bold text-center text-xl mt-8">
            muricamar2004@gmail.com
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 20 20"
            className="opacity-50 mt-8"
          >
            <path
              fill="currentColor"
              d="m1.574 5.286l7.5 4.029c.252.135.578.199.906.199s.654-.064.906-.199l7.5-4.029c.489-.263.951-1.286.054-1.286H1.521c-.897 0-.435 1.023.053 1.286m17.039 2.203l-7.727 4.027c-.34.178-.578.199-.906.199s-.566-.021-.906-.199s-7.133-3.739-7.688-4.028C.996 7.284 1 7.523 1 7.707V15c0 .42.566 1 1 1h16c.434 0 1-.58 1-1V7.708c0-.184.004-.423-.387-.219"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}

export default App;
