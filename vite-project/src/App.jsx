import logo from "./assets/logo.png";
import rcube from "./assets/rcube.png";
function App() {
  return (
    <div className="bg-[#b700ff] w-full h-screen relative">
      <header className="bg-[#a600e7] w-full py-4 px-[25rem] flex justify-between items-center">
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
      <main className="px-[25rem] relative z-50">
        <p className="mt-24 uppercase text-orange-400 text-[0.7rem] tracking-[0.2rem]">
          Welcome to solveit
        </p>
        <h1 className="text-[4rem] text-white leading-none font-semibold tracking-wide mt-8">
          Where <span className="text-cyan-400 ">technology</span> <br></br>{" "}
          meets creativity<span className="text-pink-600">.</span>
        </h1>
        <p className="leading-7 text-white mt-16 text-xl">
          Join us at the NY Technology, Design & Innovation <br></br>{" "}
          Conference, the premier gathering of visionaries on <br></br>{" "}
          <span className="text-orange-400 font-bold">
            September 17-18, 2024.
          </span>
        </p>
        <p className="text-gray-400 underline cursor-pointer mt-10">
          20+ Trusted Partners
        </p>
        <div className="flex gap-4 mt-40">
          <button className="py-4 px-10 bg-orange-400 text-white rounded-[2rem] hover:rounded-none transition-all">
            Buy a ticket
          </button>
          <button className="text-orange-400 cursor-pointer hover:underline italic">
            Discover the schedule
          </button>
        </div>
        <ul className="flex gap-3 mt-48 text-[0.8rem] text-orange-400">
          <li className="underline cursor-pointer">INSTAGRAM</li>
          <li className="underline cursor-pointer">FACEBOOK</li>
          <li className="underline cursor-pointer">GITHUB</li>
          <li className="ml-80">LINKEDIN</li>
        </ul>
      </main>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#d580ff"
        width="300"
        height="300"
        className="absolute top-60 left-60 z-0"
        viewBox="0 0 480 480"
      >
        <path d="M480 120 360 0 240 120 120 0 0 120l120 120L0 360l120 120 120-120 120 120 120-120-120-120 120-120z"></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#bc0fff"
        width="300"
        height="300"
        className="absolute top-60 left-[65rem]"
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
        className="absolute top-40 right-[30rem] rotate-[300deg] opacity-80"
      >
        <path d="M320 160C320 71.63 248.37 0 160 0S0 71.63 0 160v320h320c88.37 0 160-71.63 160-160s-71.63-160-160-160Z"></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 480 480"
        fill="#1a42e5"
        width="200"
        height="200"
        className="absolute top-[30rem] right-[50rem] opacity-80 rotate-[20deg]"
      >
        <path d="M450 210c-26.9 0-36.4-35.6-13.1-49a30 30 0 1 0-30-52c-23.3 13.5-49.3-12.6-36-35.9a30 30 0 0 0-52-30h.1c-13.4 23.3-49 13.8-49-13a30 30 0 1 0-60 0c0 26.8-35.6 36.3-49 13a30 30 0 1 0-52 30c13.5 23.3-12.6 49.4-35.9 36a30 30 0 0 0-30 52c23.3 13.3 13.8 48.9-13 48.9a30 30 0 1 0 0 60c26.8 0 36.3 35.6 13 49a30 30 0 1 0 30 52c23.3-13.5 49.4 12.6 36 35.9a30 30 0 0 0 52 30h-.1c13.4-23.3 49-13.8 49 13a30 30 0 1 0 60 0c0-26.8 35.6-36.3 49-13a30 30 0 1 0 52-30c-13.4-23.3 12.6-49.4 35.9-36a30 30 0 0 0 30-52c-23.3-13.3-13.8-48.9 13.1-48.9a30 30 0 1 0 0-60Z"></path>
      </svg>
    </div>
  );
}

export default App;
