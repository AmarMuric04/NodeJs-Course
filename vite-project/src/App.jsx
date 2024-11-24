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
import dunp from "./assets/dunp.png";

function App() {
  return (
    <div className="b bg-[#242234] w-full h-full relative">
      <header className="bg-[#262432] absolute top-0 left-0 right-0 py-4 px-[25rem] flex justify-between items-center z-50 ">
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
            <li className="hover:text-[#f00f99] transition-all cursor-pointer">
              About
            </li>
            <li className="hover:text-[#f00f99] transition-all cursor-pointer">
              Categories
            </li>
            <li className="hover:text-[#f00f99] transition-all cursor-pointer">
              Sponsors
            </li>
            <li className="hover:text-[#f00f99] transition-all cursor-pointer">
              Contacts
            </li>
            <li className="hover:text-[#f00f99] transition-all cursor-pointer">
              Credits
            </li>
          </ul>
        </section>
        <section className="flex items-center justify-between gap-4">
          <button className="border-b-2 border-pink-600 py-2 text-white px-10">
            Sign Up
          </button>
          <button className="text-white bg-pink-600 py-2 px-10 rounded-[2rem] transition-all hover:rounded-none">
            Sign In
          </button>
        </section>
      </header>
      <main className="h-screen px-[25rem] relative">
        <div className="relative z-40 pt-48 h-full">
          <p className="uppercase noto text-[#ecd86c] text-[0.6rem] tracking-[0.15rem]">
            Welcome to solveit
          </p>
          <h1 className="text-[5rem] text-white leading-none font-semibold tracking-wide mt-4">
            Where <span className="text-[#f00f99] ">problems</span> <br></br>{" "}
            meet solutions<span className="text-[#75e1d9]">.</span>
          </h1>
          <p className="noto-sans font-semibold leading-7 text-white mt-12 text-lg">
            Join us at the NY Technology, Design & Innovation <br></br>{" "}
            Conference, the premier gathering of visionaries on <br></br>{" "}
            <span className="text-[#ecd86c] font-bold">
              September 17-18, 2024.
            </span>
          </p>
          <p className="text-gray-300 underline cursor-pointer mt-6">
            20+ Trusted Partners
          </p>
          <div className="my-10">
            <img className="h-20 object-cover" src={dunp} />
          </div>
          <div className="flex gap-4 mt-20">
            <button className="py-4 px-10 bg-[#ecd86c] text-white rounded-[2rem] hover:rounded-none transition-all">
              Buy a ticket
            </button>
            <button className="text-[#ecd86c] cursor-pointer hover:underline italic">
              Discover the schedule
            </button>
          </div>
          <ul className="flex gap-3 mt-32 text-[0.8rem] text-[#ecd86c]">
            <li className="noto text-[0.6rem] tracking-[0.1rem] underline cursor-pointer">
              INSTAGRAM
            </li>
            <li className="noto text-[0.6rem] tracking-[0.1rem] underline cursor-pointer">
              FACEBOOK
            </li>
            <li className="noto text-[0.6rem] tracking-[0.1rem] underline cursor-pointer">
              GITHUB
            </li>
            <li className="noto text-[0.6rem] tracking-[0.1rem] underline cursor-pointer ml-80">
              LINKEDIN
            </li>
          </ul>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#262432"
          width="400"
          height="400"
          className="absolute top-28 left-10 z-0"
        >
          <path d="M480 240H0a240 240 0 1 1 480 0ZM480 480H0a240 240 0 1 1 480 0Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#262432"
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
          fill="#383b48"
          width="250"
          height="250"
          className="absolute top-20 right-80 z-0"
        >
          <path d="m353.1 240 56.6-56.6a80 80 0 0 0-61-136.4H131.3a79.8 79.8 0 0 0-61 136.4l56.6 56.6-56.6 56.6a80 80 0 0 0 61 136.4h217.4a79.8 79.8 0 0 0 61-136.4L353.1 240Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#262432"
          width="600"
          height="600"
          className="absolute bottom-4 right-[50rem] z-0"
        >
          <path d="M0 0v240L240 0H0zM480 480V240L240 480h240zM240 240h240L240 0v240zM240 240H0l240 240V240z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#262432"
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
          fill="#262432"
          width="300"
          height="300"
          className="absolute bottom-10 left-10"
        >
          <path d="M480 240H240V0a240 240 0 0 1 240 240ZM240 480H0V240a240 240 0 0 1 240 240ZM480 480H240V240a240 240 0 0 1 240 240ZM240 240H0V0a240 240 0 0 1 240 240Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#262432"
          width="400"
          height="400"
          className="absolute bottom-10 right-10"
        >
          <path d="M480 210H352l110.9-64-30-52L322 158l64-110.8-52-30L270 128V0h-60v128L146 17.2l-52 30L158 158 47.2 94l-30 52L128 210H0v60h128L17.2 334l30 52L158 322 94 432.9l52 30L210 352v128h60V352l64 110.9 52-30L322 322l110.9 64 30-52L352 270h128v-60z"></path>
        </svg>
        {/* ---- */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#ecd86c"
          width="300"
          height="300"
          className="absolute bottom-20 right-60 opacity-80 z-50 joyful-container"
        >
          <path d="M409.7 409.7c33.2-33.2 23.8-100.2-17.9-169.7 41.7-69.6 51.1-136.5 18-169.7C376.4 37 309.4 46.5 240 88.2 170.4 46.5 103.5 37 70.3 70.2 37 103.6 46.5 170.5 88.2 240c-41.7 69.5-51.1 136.5-18 169.7 33.3 33.2 100.2 23.8 169.8-17.9 69.5 41.7 136.5 51.1 169.7 18Z"></path>
          <img className="bg-red-400" src={rcube} />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#f00f99"
          width="200"
          height="200"
          className="absolute top-48 right-[30rem] opacity-80 z-50 joyful-container"
        >
          <rect width="480" height="480" rx="120" ry="120"></rect>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#75e1d9"
          width="250"
          height="250"
          className="absolute top-[30rem] right-[50rem] opacity-80 z-50 joyful-container"
        >
          <path d="M409 295.9a79 79 0 0 1 .7-112.5A80 80 0 0 0 296.6 70.3 79 79 0 0 1 184 71a80.7 80.7 0 0 0-113.4-1.1C39 101 39 152 70.3 183.4s30.5 82.7.7 112.5a80.7 80.7 0 0 0-1.1 113.4 80 80 0 0 0 113.5.4 79 79 0 0 1 113.2 0 80 80 0 0 0 113.5-.4c31-31.4 30-82.2-1.1-113.4Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#75e1d9"
          width="75"
          height="75"
          className="absolute top-[10rem] right-[65rem] opacity-80 z-50 joyful-container"
        >
          <path d="M360 289.7c43.4 0 86.9-16.6 120-49.7a169.2 169.2 0 0 0-120-49.7 169.2 169.2 0 0 0 49.7-120c-46.9 0-89.3 19-120 49.7 0-43.4-16.6-86.9-49.7-120a169.2 169.2 0 0 0-49.7 120 169.2 169.2 0 0 0-120-49.7c0 46.8 19 89.3 49.7 120-43.4 0-86.9 16.6-120 49.7a169.2 169.2 0 0 0 120 49.7 169.2 169.2 0 0 0-49.7 120c46.8 0 89.3-19 120-49.7 0 43.4 16.6 86.9 49.7 120a169.2 169.2 0 0 0 49.7-120 169.2 169.2 0 0 0 120 49.7c0-46.9-19-89.3-49.7-120Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#f00f99"
          width="75"
          height="75"
          className="absolute top-[25rem] right-[20rem] opacity-80 z-50 joyful-container"
        >
          <path d="M371.3 294.4 480 240l-108.7-54.4 38.4-115.3-115.3 38.4L240 0l-54.4 108.7L70.3 70.3l38.4 115.3L0 240l108.7 54.4-38.4 115.3 115.3-38.4L240 480l54.4-108.7 115.3 38.4-38.4-115.3z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#ecd86c"
          width="75"
          height="75"
          className="absolute bottom-20 right-[45rem] opacity-80 z-50 joyful-container"
        >
          <circle cx="240" cy="240" r="240"></circle>
        </svg>
        <img
          className="h-40 w-40 absolute top-[20rem] rotate-[90deg] right-[37rem] z-50"
          src="https://pngimg.com/d/rubik_cube_PNG23.png"
        />
        <img
          className="h-28 w-28 absolute top-[40rem] rotate-[40deg] right-[45rem] z-50"
          src="https://www.grubiks.com/images/puzzles/17/small.png"
        />
      </main>
      <section className="bg-[#e3ff80] px-[25rem] w-full flex justify-between items-center py-6">
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
        <h1 className="text-[3rem] leading-[3.5rem] font-semibold text-white text-center w-2/3">
          SolveIt is a dynamic{" "}
          <span className="text-[#f00f99]">online hub</span> dedicated to{" "}
          <span className="text-[#75e1d9]">puzzles</span> and{" "}
          <span className="text-[#ecd86c]">brain-teasing</span> challenges
          <span className="text-[#f00f99]">.</span>
        </h1>
        <p className="text-center mt-16 text-md text-gray-300 w-2/3">
          Bringing together enthusiasts of Sudoku, Rubik's Cube, logic puzzles,
          and more, SolveIt fosters a friendly and engaging community for puzzle
          lovers worldwide.{" "}
          <span className="italic">
            It's all about sharpening your mind, tackling new challenges, and
            finding creative solutions
          </span>
          . On SolveIt, you’ll discover expert tips, step-by-step tutorials, and
          a treasure trove of resources designed to help you master your
          favorite puzzles and explore new ones. Whether you're a beginner or a
          seasoned solver,{" "}
          <span className="italic">
            SolveIt is the ultimate destination for{" "}
            <span className="font-bold underline">
              unlocking your problem-solving potential
            </span>
          </span>
          .
        </p>
        <div className="h-[0.1rem] w-64 bg-[#75e1d9] mt-10"></div>
        <div className="mt-20 m font-thin">
          <h1 className="text-center text-[#f00f99] text-xl uppercase noto tracking-[0.1rem]">
            Active since
          </h1>
          <div className="flex gap-2 items-end mt-8">
            <p className="text-white text-4xl  p-4 border-r-2 border-[#383b48]">
              21st
            </p>
            <p className="text-white text-4xl  p-4 border-r-2 border-[#383b48]">
              November
            </p>
            <p className="text-4xl  text-white p-4">
              2024<span className="text-[#75e1d9]">.</span>
            </p>
          </div>
        </div>
      </section>
      <section className="polygon bg-purple-200 w-full px-[25rem] py-40 z-50 relative">
        <p className="text-[0.7rem] tracking-[0.1rem] pt-8 pb-4 noto">
          KEY CATEGORIES
        </p>
        <div className="flex w-full">
          <div className="w-2/3">
            <p className="text-black text-[3rem] leading-[3rem] font-semibold">
              Interactive <span className="text-[#f00f99]">lessons</span> on
              cool and
              <br></br>emerging puzzles or challenges
              <span className="text-[#75e1d9]">.</span>
            </p>
          </div>
          <ul className="w-1/3 flex flex-col justify-between noto-sans font-light text-[0.9rem]">
            <li className="flex gap-2 text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 2048 2048"
                className="text-[#ecd86c]"
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
                className="text-[#ecd86c]"
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
                className="text-[#ecd86c]"
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
        <ul className="flex justify-between px-20 py-16 font-light noto">
          <li className="flex flex-col items-center gap-4">
            <p className="text-[3.5rem] font-bold l">3</p>
            <p className="text-[0.6rem] text-gray-700 tracking-[0.1rem]">
              WEEKS OF WORK
            </p>
            <div className="h-[0.7rem] w-[0.7rem] rounded-full bg-[#ecd86c] mt-4"></div>
          </li>
          <li className="flex flex-col items-center gap-4">
            <p className="text-[3.5rem] font-bold l">230k+</p>
            <p className="text-[0.6rem] text-gray-700 tracking-[0.1rem]">
              TOTAL ATTENDANCE
            </p>
            <div className="h-[0.7rem] w-[0.7rem] rounded-full bg-pink-600 mt-4"></div>
          </li>
          <li className="flex flex-col items-center gap-4">
            <p className="text-[3.5rem] font-bold l">539</p>
            <p className="text-[0.6rem] text-gray-700 tracking-[0.1rem]">
              SUPPORTED PUZZLES
            </p>
            <div className="h-[0.7rem] w-[0.7rem] rounded-full bg-[#75e1d9] mt-4"></div>
          </li>
          <li className="flex flex-col items-center gap-4">
            <p className="text-[3.5rem] font-bold l">4k+</p>
            <p className="text-[0.6rem] text-gray-700 tracking-[0.1rem]">
              CURRENTLY ACTIVE USERS
            </p>
            <div className="h-[0.7rem] w-[0.7rem] rounded-full bg-lime-400 mt-4"></div>
          </li>
        </ul>
      </section>
      <section className="px-[25rem] relative">
        <div className="z-50 py-40 relative">
          <p className="text-[0.7rem] tracking-[0.2rem] py-8 text-[#ecd86c]">
            FEATURES
          </p>
          <h1 className="text-white text-[3rem] leading-[3rem] font-bold">
            Why you <span className="text-[#ecd86c]">should visit</span> SolveIt
            <span className="text-[#f00f99]">.</span>
          </h1>
          <div className="w-full mt-14 flex gap-5 h-80">
            <div className="bg-[#ecd86c] w-1/3 p-8 hover:-translate-y-7 transition-all">
              <div className="w-16 h-16 bg-[#e6cc3e] flex items-center justify-center rounded-full">
                <img className="w-3/5 h-3/5" src={trophy} />
              </div>
              <h1 className="text-[1.5rem] py-4 font-semibold">Inspiration</h1>
              <div className="h-[0.2rem] w-20 bg-[#ffa100] mb-4"></div>
              <p className="text-lg text-gray-700">
                Our speakers will inspire you with mind-blowing ideas supported
                by real-world-examples and stories.
              </p>
            </div>
            <div className="bg-pink-600 w-1/3 p-8 hover:-translate-y-7 transition-all">
              <div className="w-16 h-16 bg-[#cd0d83] flex items-center justify-center rounded-full">
                <img className="w-3/5 h-3/5" src={tup} />
              </div>
              <h1 className="text-[1.5rem] py-4 font-semibold">Community</h1>
              <div className="h-[0.2rem] w-20 bg-[#cd0d83] mb-4"></div>
              <p className="text-lg text-gray-700">
                Become a part of the warm, respectful and intelligent community
                of entrepreneurs and innovators.
              </p>
            </div>
            <div className="bg-[#75e1d9] w-1/3 p-8 hover:-translate-y-7 transition-all">
              <div className="w-16 h-16 bg-[#53dad0] flex items-center justify-center rounded-full">
                <img className="w-3/5 h-3/5" src={creativ} />
              </div>
              <h1 className="text-[1.5rem] py-4 font-semibold">Challenge</h1>
              <div className="h-[0.2rem] w-20 bg-[#53dad0] mb-4"></div>
              <p className="text-lg text-gray-700">
                Experience unexpected emotions, learn more about alternative
                perspectives, and discover ideas.
              </p>
            </div>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#262432"
          width="400"
          height="400"
          className="absolute -top-40 left-10 z-0"
        >
          <path d="M480 240H0a240 240 0 1 1 480 0ZM480 480H0a240 240 0 1 1 480 0Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#262432"
          width="300"
          height="300"
          className="absolute -top-[8rem] left-[38rem] z-0"
          viewBox="0 0 480 480"
        >
          <path d="M480 120 360 0 240 120 120 0 0 120l120 120L0 360l120 120 120-120 120 120 120-120-120-120 120-120z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#383b48"
          width="250"
          height="250"
          className="absolute -top-32 right-80 z-0"
        >
          <path d="m353.1 240 56.6-56.6a80 80 0 0 0-61-136.4H131.3a79.8 79.8 0 0 0-61 136.4l56.6 56.6-56.6 56.6a80 80 0 0 0 61 136.4h217.4a79.8 79.8 0 0 0 61-136.4L353.1 240Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#262432"
          width="600"
          height="600"
          className="absolute -bottom-48s right-[50rem] z-0"
        >
          <path d="M0 0v240L240 0H0zM480 480V240L240 480h240zM240 240h240L240 0v240zM240 240H0l240 240V240z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#262432"
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
          fill="#262432"
          width="300"
          height="300"
          className="absolute -bottom-32 left-10"
        >
          <path d="M480 240H240V0a240 240 0 0 1 240 240ZM240 480H0V240a240 240 0 0 1 240 240ZM480 480H240V240a240 240 0 0 1 240 240ZM240 240H0V0a240 240 0 0 1 240 240Z"></path>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 480 480"
          fill="#262432"
          width="400"
          height="400"
          className="absolute -bottom-32 right-10"
        >
          <path d="M480 210H352l110.9-64-30-52L322 158l64-110.8-52-30L270 128V0h-60v128L146 17.2l-52 30L158 158 47.2 94l-30 52L128 210H0v60h128L17.2 334l30 52L158 322 94 432.9l52 30L210 352v128h60V352l64 110.9 52-30L322 322l110.9 64 30-52L352 270h128v-60z"></path>
        </svg>
      </section>
      <section className="polygon bg-purple-200 w-full px-[25rem] py-40 z-50 relative">
        <p className="text-[0.7rem] tracking-[0.2rem] py-8 text-center">
          SUBSCRIPTION OPTIONS
        </p>
        <h1 className="text-[3rem] leading-[3rem] font-bold text-center">
          Choose your suitable{" "}
          <span className="text-[#f00f99]">subscription</span> package
          <span className="text-[#75e1d9]">.</span>
        </h1>
        <p className="text-gray-700 text-lg text-center py-8">
          We offer several tickets types for your convenience.
        </p>
        <div className="w-full mt-10 flex gap-5">
          <div className="bg-[#75e1d9] w-1/3 p-8 hover:-translate-y-2 transition-all">
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
            <button className="bg-gray-800 py-5 rounded-[2rem] hover:rounded-none transition-all px-10 font-bold text-white">
              Buy subscription
            </button>
          </div>
          <div className="bg-pink-600 w-1/3 p-8 hover:-translate-y-2 transition-all">
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
            <button className="bg-gray-800 py-5 rounded-[2rem] hover:rounded-none transition-all px-10 font-bold text-white">
              Buy subscription
            </button>
          </div>
          <div className="bg-[#ecd86c] w-1/3 p-8 hover:-translate-y-2 transition-all">
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
            <button className="bg-gray-800 py-5 rounded-[2rem] hover:rounded-none transition-all px-10 font-bold text-white">
              Buy subscription
            </button>
          </div>
        </div>
      </section>
      <section className="px-[25rem] py-40">
        <p className="text-[#ecd86c] text-[0.7rem] tracking-[0.2rem] py-8 text-center">
          TESTIMONIALS
        </p>
        <h1 className="text-white text-[3rem] leading-[3rem] font-bold text-center">
          Our <span className="text-[#75e1d9]">users</span> about their
          experience
          <span className="text-[#75e1d9]">.</span>
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
          <div className="bg-[#75e1d9] w-1/3 py-10 px-8 flex flex-col justify-between items-center">
            <h1 className="mb-4 text-2xl font-semibold text-center">
              Buy three or more tickets and get{" "}
              <span className="text-[#f00f99]">20% off.</span>
            </h1>
            <p className="tracking-[0.2rem] underline text-[0.6rem]">
              BUY TICKETS NOW
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-[3rem] font-bold text-white text-center mt-48">
            Have any <span className="text-[#75e1d9]">feedback</span>? We would{" "}
            <span className="text-[#f00f99]">love to </span> hear it
            <span className="text-[#ecd86c]">!</span>
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
      <section className="polygon bg-purple-200 w-full px-[25rem] py-40 flex gap-40">
        <div className="w-1/2">
          <p className="text-[0.7rem] tracking-[0.2rem] py-8">OUR NEWSLETTER</p>
          <h1 className="text-[3rem] leading-[3rem] font-bold">
            Get the latest <span className="text-[#f00f99]">news</span>.
            <br></br> Right when they happen
            <span className="text-[#ecd86c]">!</span>
          </h1>
          <p className="my-4 text-xl text-semibold">
            Have questions? Browse the section below.
          </p>
          <p className="text-gray-700">
            We kindly ask you to browse through this section to find answers on
            your questions about our conference, venue, tickets, etc. If you
            still have questions or inquiries, please fill out the form on the
            right.
          </p>
        </div>
        <div className="bg-[#242234] w-1/2 p-16 flex flex-col gap-16">
          <p className="text-3xl font-semibold text-white text-center">
            Don{"'"}t miss your opportunity to learn more!
          </p>
          <div className="flex flex-col gap-4">
            <input
              className="px-4 py-6 w-full bg-[#262432]"
              placeholder="Your Name*"
              type="text"
            />
            <input
              className="px-4 py-6 w-full bg-[#262432]"
              type="number"
              placeholder="Your Number*"
            />
            <input
              className="px-4 py-6 w-full bg-[#262432]"
              type="email"
              placeholder="Your Email*"
            />
          </div>
          <button className="w-full text-center bg-[#ecd86c] py-4 text-black rounded-[2rem] hover:rounded-none transition-all">
            Subscribe
          </button>
        </div>
      </section>
      <footer className="px-[25rem] pt-40">
        <h1 className="text-[3rem] leading-[3rem] font-bold text-center">
          A vibrant and <span className="text-[#75e1d9]">inclusive</span>{" "}
          community of <span className="text-[#ecd86c]">solvers</span> and{" "}
          <span className="text-[#f00f99]">challengers</span>
          <span className="text-[#75e1d9]">.</span>
        </h1>
        <p className="text-3xl font-bold text-center my-8">
          Learn <span className="text-[#f00f99] underline">more</span> now!
        </p>
        <div className="w-full flex justify-between my-8">
          <img
            className="w-[14%] h-44 object-cover"
            src="https://images.unsplash.com/photo-1605902394069-ff2ae2430e62?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <img
            className="w-[14%] h-44 object-cover"
            src="https://plus.unsplash.com/premium_photo-1723662084148-2cd2357705ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHV6emxlfGVufDB8fDB8fHww"
          />
          <img
            className="w-[14%] h-44 object-cover"
            src="https://images.unsplash.com/photo-1597400473366-371a80b251eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHV6emxlfGVufDB8fDB8fHww"
          />
          <img
            className="w-[14%] h-44 object-cover"
            src="https://plus.unsplash.com/premium_photo-1694822449585-a2444c288b96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHV6emxlfGVufDB8fDB8fHww"
          />
          <img
            className="w-[14%] h-44 object-cover"
            src="https://plus.unsplash.com/premium_photo-1700675175408-5fe0d5851e57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHB1enpsZXxlbnwwfHwwfHx8MA%3D%3D"
          />
          <img
            className="w-[14%] h-44 object-cover object-right"
            src="https://images.unsplash.com/photo-1515508268448-8d0d292bc49a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHB1enpsZXxlbnwwfHwwfHx8MA%3D%3D"
          />
        </div>
        <div className="w-full flex py-20 justify-between">
          <div className="w-2/5">
            <h1 className="font-semibold text-white text-2xl">
              Technology, Design & Innovation Conference
            </h1>
            <p className="py-4 text-gray-300 text-lg text-semibold">
              We bring puzzle experts together.
            </p>
            <p className="py-4 text-gray-300 text-semibold">
              Join us at the NY Technology, Design & Innovation Conference, the
              premier gathering of visionaries on September 17-18, 2024. Feel
              free to contact us in any convenient way for more details.
            </p>
          </div>
          <div className="flex gap-20">
            <div className="flex flex-col gap-10">
              <div className="flex gap-3 h-20">
                <div className="bg-[#262432] rounded-full p-4 flex justify-center items-center w-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <path
                      fill="currentColor"
                      d="M19.5 22a1.5 1.5 0 0 0 1.5-1.5V17a1.5 1.5 0 0 0-1.5-1.5c-1.17 0-2.32-.18-3.42-.55a1.51 1.51 0 0 0-1.52.37l-1.44 1.44a14.77 14.77 0 0 1-5.89-5.89l1.43-1.43c.41-.39.56-.97.38-1.53c-.36-1.09-.54-2.24-.54-3.41A1.5 1.5 0 0 0 7 3H3.5A1.5 1.5 0 0 0 2 4.5C2 14.15 9.85 22 19.5 22M3.5 4H7a.5.5 0 0 1 .5.5c0 1.28.2 2.53.59 3.72c.05.14.04.34-.12.5L6 10.68c1.65 3.23 4.07 5.65 7.31 7.32l1.95-1.97c.14-.14.33-.18.51-.13c1.2.4 2.45.6 3.73.6a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-.5.5C10.4 21 3 13.6 3 4.5a.5.5 0 0 1 .5-.5"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-yellow-400 tracking-[0.2rem] text-[0.7rem] font-semibold">
                    PHONE
                  </p>
                  <p className="text-white text-lg font-semibold">
                    +381 {"("}063{")"} 303 309
                  </p>
                  <p className="text-white text-lg font-semibold">
                    +381 {"("}063{")"} 303 309
                  </p>
                </div>
              </div>
              <div className="flex gap-3 h-20">
                <div className="bg-[#262432] rounded-full p-4 flex justify-center items-center w-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <path
                      fill="currentColor"
                      d="M5 5h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3m0 1c-.5 0-.94.17-1.28.47l7.78 5.03l7.78-5.03C18.94 6.17 18.5 6 18 6zm6.5 6.71L3.13 7.28C3.05 7.5 3 7.75 3 8v9a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V8c0-.25-.05-.5-.13-.72z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-yellow-400 tracking-[0.2rem] text-[0.7rem] font-semibold">
                    EMAIL
                  </p>
                  <p className="text-white text-lg font-semibold">
                    muricamar2004@gmail.com
                  </p>
                  <p className="text-white text-lg font-semibold">
                    muricamar2004@gmail.com
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex gap-3 h-20">
                <div className="bg-[#262432] rounded-full p-4 flex justify-center items-center w-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 256 256"
                    className="text-white"
                  >
                    <path
                      fill="currentColor"
                      d="M154.7 142.75a36 36 0 1 0-37.4 0a63.6 63.6 0 0 0-32.5 22.85a4 4 0 0 0 6.4 4.8a56 56 0 0 1 89.6 0a4 4 0 0 0 6.4-4.8a63.65 63.65 0 0 0-32.5-22.85M108 112a28 28 0 1 1 28 28a28 28 0 0 1-28-28m100-84H64a12 12 0 0 0-12 12v28H32a4 4 0 0 0 0 8h20v48H32a4 4 0 0 0 0 8h20v48H32a4 4 0 0 0 0 8h20v28a12 12 0 0 0 12 12h144a12 12 0 0 0 12-12V40a12 12 0 0 0-12-12m4 188a4 4 0 0 1-4 4H64a4 4 0 0 1-4-4V40a4 4 0 0 1 4-4h144a4 4 0 0 1 4 4Z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-yellow-400 tracking-[0.2rem] text-[0.7rem] font-semibold">
                    ADDRESS
                  </p>
                  <p className="text-white text-lg font-semibold">Serbia,</p>
                  <p className="text-white text-lg font-semibold">Novi Pazar</p>
                </div>
              </div>
              <div className="flex gap-3 h-20">
                <div className="bg-[#262432] rounded-full p-4 flex justify-center items-center w-20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2em"
                    height="2em"
                    viewBox="0 0 24 24"
                    className="text-white"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    >
                      <path d="M21 8v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5M7 17v-7" />
                      <path d="M11 17v-3.25M11 10v3.75m0 0c0-3.75 6-3.75 6 0V17M7 7.01l.01-.011" />
                    </g>
                  </svg>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-yellow-400 tracking-[0.2rem] text-[0.7rem] font-semibold">
                    LINKEDIN
                  </p>
                  <p className="text-white text-lg font-semibold">Amar Muric</p>
                  <p className="text-white text-lg font-semibold">Amar Muric</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex py-20 border-y-2 border-purple-500">
          <div className="w-[40%]">
            <section className="flex gap-3">
              <img className="h-10" src={logo} />
              <div className="flex flex-col justify-between">
                <h1 className="text-white font-extrabold text-xl tracking-[0.2rem]">
                  SOLVEIT
                </h1>
                <p className="text-gray-300 text-[0.6rem]">HELP & FEEDBACK</p>
              </div>
            </section>
            <p className="my-4 text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              possimus nesciunt modi corporis magni consectetur beatae sed! Cum,
              eos rem!
            </p>
          </div>
          <div className="w-[40%] flex justify-around">
            <div>
              <h1 className="font-semibold text-white text-3xl">Navigation</h1>
              <div className="bg-pink-600 w-8 h-[0.2rem] my-3"></div>
              <ul className="flex flex-col gap-3 text-gray-200 font-semibold">
                <li>About Us</li>
                <li>Schedule</li>
                <li>Speakers</li>
                <li>Sponsors</li>
              </ul>
            </div>
            <div>
              <h1 className="font-semibold text-white text-3xl">Support</h1>
              <div className="bg-pink-600 w-8 h-[0.2rem] my-3"></div>
              <ul className="flex flex-col gap-3 text-gray-200 font-semibold">
                <li>Pricing</li>
                <li>Help & Support</li>
                <li>Privacy Policy</li>
                <li>Contacts</li>
              </ul>
            </div>
          </div>
          <div className="w-[20%] flex flex-col justify-between">
            <h1 className="font-semibold text-white text-3xl">Subscribe</h1>
            <input
              className="p-6 w-full bg-[#262432]"
              type="email"
              placeholder="Email*"
            />
            <button className="py-4 px-10 w-full bg-[#ecd86c] rounded-[2rem] hover:rounded-none transition-all">
              Subscribe
            </button>
          </div>
        </div>
        <div className="text-white flex justify-between items-center py-8">
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
                stroke-linecap="round"
                stroke-width="1.5"
              >
                <path d="M14 15.667a4.5 4.5 0 0 1-1.714.333C9.919 16 8 14.21 8 12s1.919-4 4.286-4c.61 0 1.189.119 1.714.333" />
                <path d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
              </g>
            </svg>
            <p>Created by Amar</p>
          </span>
          <p>All rights Reserved</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
