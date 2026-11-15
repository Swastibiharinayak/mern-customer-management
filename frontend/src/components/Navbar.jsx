import { CiSquarePlus } from "react-icons/ci";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { Link } from "react-router-dom";

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full py-3 bg-white dark:bg-neutral-800 border-b border-gray-200 dark:border-neutral-700">
      <nav className="max-w-340 w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
        <Link to={"/"}>
          <h1 className="flex-none font-semibold text-3xl text-gray-800 dark:text-neutral-200 focus:outline-hidden focus:opacity-80">
            Shop
          </h1>
        </Link>
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          <Link to={"/create"}>
            <button className="flex-none font-semibold text-4xl text-gray-800 dark:text-neutral-200 focus:outline-hidden focus:opacity-80">
              <CiSquarePlus />
            </button>
          </Link>
          <button
            onClick={toggleTheme}
            className="rounded-lg px-4 py-2 text-white"
          >
            {theme === "light" ? <IoMoon /> : <LuSun />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
