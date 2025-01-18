import { Link } from "react-router-dom";
import logo from "../assets/light-logo.png";

const Footer = () => {
  return (
    <footer className=" bg-[#070707] bg5 w-full flex justify-center relative text-gray-400">
      <svg
        className="absolute top-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        fill="#A855F7"
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
                Join us at the Puzzle Solver's Hub, where puzzle enthusiasts and
                experts come together to share tips, tricks, and solutions.
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
                Join us at the Puzzle Solver's Hub, the premier online community
                for puzzle enthusiasts. Explore new challenges, share your
                expertise, and connect with fellow solvers. Feel free to contact
                us anytime for more details!
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
                <li data-english="Help & Support" data-srpski="Помоћ и подршка">
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
  );
};

export default Footer;
