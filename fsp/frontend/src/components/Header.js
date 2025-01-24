import { Link } from "react-router-dom";
import logo from "../assets/light-logo.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../utility/util";
import { setNotification } from "../storage/notificationSlice";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
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
      className="w-full bg-[#191919] bg-opacity-20 text-white justify-center fixed left-0 flex shadow-lg z-50 transition-all backdrop-blur-sm"
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
              href="/#about"
              className="cursor-pointer font-semibold hover:text-orange-500 transition-all"
            >
              About Us
            </a>
            <a
              href="/#reviews"
              className="cursor-pointer font-semibold hover:text-orange-500 transition-all"
            >
              Reviews
            </a>
            <div className="h-[25px] w-[1px] bg-orange-600"></div>
            <Link to="/feed">
              <p className="cursor-pointer font-semibold hover:text-orange-500 transition-all">
                Feed
              </p>
            </Link>
            {isAuth && user && (
              <Link to="/create-post">
                <p className="cursor-pointer font-semibold hover:text-orange-500 transition-all">
                  Create
                </p>
              </Link>
            )}
          </div>
        </div>

        <div className="flex gap-2 items-center">
          {isAuth && user ? (
            <>
              <div className="flex flex-col text-end">
                <p className="font-semibold text-sm">
                  {user?.fname}, {user?.lname}
                </p>
                <p className="text-xs text-orange-500">{user?.email}</p>
              </div>
              <div className="relative">
                <img
                  className="h-[4rem] w-[4rem] rounded-full object-cover"
                  src={"http://localhost:8080/" + user?.imageUrl}
                  alt="User's Pfp"
                />
                <Link to={`/profile/${user.slug}`}>
                  <button className="absolute z-50 top-0 left-0 w-full h-full opacity-0 bg-opacity-60 bg-gray-500 hover:opacity-100 transition-all text-white rounded-full">
                    View
                  </button>
                </Link>
              </div>
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
              <Link to="/signin">
                <button className="bg-purple-500 hover:bg-orange-500 hover:bg-opacity-10 bg-opacity-10 py-2 px-8 rounded-[2rem] hover:rounded-none transition-all">
                  Sign In
                </button>
              </Link>
              <Link to="/signup">
                <button className="bg-purple-500 hover:bg-orange-500 text-white py-2 px-8 rounded-[2rem] hover:rounded-none transition-all">
                  Sign Up
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
