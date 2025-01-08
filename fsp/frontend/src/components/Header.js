import { Link } from "react-router-dom";
import logo from "../assets/fs.png";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logoutUser } from "../utility/util";

const Header = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
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
          <p className="font-semibold">About</p>
          <p className="font-semibold">Contact Us</p>
          <p className="font-semibold">Subscribe</p>
        </div>
        <div className="flex gap-2">
          {isAuth ? (
            <button
              onClick={handleLogout}
              className="bg-gray-800 bg-opacity-10 py-2 px-8 rounded-[2rem] hover:rounded-none"
            >
              Sign Out
            </button>
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
