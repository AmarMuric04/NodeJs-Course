import { Link } from "react-router-dom";
import logo from "../assets/light-logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../utility/util";
import { setNotification } from "../storage/notificationSlice";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogout = () => {
    logoutUser(dispatch);
  };

  return (
    <header
      ref={headerRef}
      className="w-full bg-[#191919] text-white justify-center fixed left-0 flex shadow-lg z-50 transition-all"
      style={{
        top: isVisible ? 0 : `-${headerRef.current?.offsetHeight || 0}px`,
      }}
    >
      <nav className="w-[75rem] flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link to="/" className="h-full flex items-center">
            <img className="h-[5rem]" src={logo} alt="Logo" />
            <div>
              <p className="playwrite font-bold text-lg">Fullstack</p>
              <p className="text-sm text-gray-500">MERN Website</p>
            </div>
          </Link>
          <div className="flex gap-8">
            <a
              href="#about"
              className="cursor-pointer font-semibold hover:text-purple-400 transition-all"
            >
              About Us
            </a>
            <a
              href="#reviews"
              className="cursor-pointer font-semibold hover:text-purple-400 transition-all"
            >
              Reviews
            </a>
            <div className="h-[25px] w-[1px] bg-gray-600"></div>
            <Link to="/feed?page=1">
              <p className="cursor-pointer font-semibold hover:text-purple-400 transition-all">
                Feed
              </p>
            </Link>
            {isAuth && (
              <Link to="/create-post">
                <p className="cursor-pointer font-semibold hover:text-purple-400 transition-all">
                  Create
                </p>
              </Link>
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          {isAuth ? (
            <>
              <div className="flex flex-col text-end">
                <p className="font-semibold text-sm">
                  {user?.fname}, {user?.lname}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <img
                className="h-[4rem] w-[4rem] rounded-full object-cover"
                src={"http://localhost:8080/" + user?.imageUrl}
                alt="User's Pfp"
              />
              <button
                onClick={() => {
                  handleLogout();
                  dispatch(setNotification({ message: "Signed out!" }));
                }}
                className="bg-purple-500 hover:bg-orange-500 py-2 px-8 rounded-[2rem] hover:rounded-none transition-all"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <button className="bg-purple-500 hover:bg-orange-500 hover:bg-opacity-10 bg-opacity-10 py-2 px-8 rounded-[2rem] hover:rounded-none transition-all">
                  Sign Up
                </button>
              </Link>
              <Link to="/signin">
                <button className="bg-purple-500 hover:bg-orange-500 text-white py-2 px-8 rounded-[2rem] hover:rounded-none transition-all">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
