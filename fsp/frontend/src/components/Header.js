import { Link } from "react-router-dom";
import logo from "../assets/fs.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../utility/util";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logoutUser(dispatch);
  };

  return (
    <header className="w-full bg-blue-200 justify-center absolute left-0 top-0 h-[5rem] flex shadow-lg">
      <nav className="w-[75rem] flex justify-between items-center">
        <Link to="/" className="h-full flex items-center">
          <img className="h-[5rem]" src={logo} alt="Logo" />
          <div>
            <p className="playwrite font-bold text-lg">Fullstack</p>
            <p className="text-sm text-gray-500">MERN Website</p>
          </div>
        </Link>
        <div className="flex gap-4">
          <p className="cursor-pointer font-semibold hover:text-orange-400 transition-all">
            About
          </p>
          <p className="cursor-pointer font-semibold hover:text-orange-400 transition-all">
            Contact Us
          </p>
          <p className="cursor-pointer font-semibold hover:text-orange-400 transition-all">
            Subscribe
          </p>
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
                onClick={handleLogout}
                className="bg-gray-800 bg-opacity-10 py-2 px-8 rounded-[2rem] hover:rounded-none"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">
                <button className="bg-gray-800 bg-opacity-10 py-2 px-8 rounded-[2rem] hover:rounded-none">
                  Sign Up
                </button>
              </Link>
              <Link to="/signin">
                <button className="bg-gray-800 text-white py-2 px-8 rounded-[2rem] hover:rounded-none">
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
