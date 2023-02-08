import { useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowRightCircle } from "react-icons/bs";
import {
  AiFillDashboard,
  AiOutlineShopping,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import LogoutButton from "./authentication/LogoutButton";

const Navbar = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true);

  const handleNavbar = (): void => {
    setOpen(!open);
  };

  return (
    <div className="flex h-full">
      <div
        className={` ${
          open ? "fixed w-screen sm:w-52" : "w-20 "
        } bg-light-grey p-5  pt-8 relative duration-300`}
      >
        <BsArrowRightCircle
          className={`absolute cursor-pointer rotate-180 -right-0 mr-3 top-9 w-8 h-8 text-dark-green ${
            !open && "rotate-0"
          }`}
          onClick={handleNavbar}
        />

        <div className="flex gap-x-4 items-center">
          <h1
            className={`text-sky-blue origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
            data-cy="navbar_header"
          >
            Dashboard
          </h1>
        </div>
        <ul className="pt-6">
          <Link to="/dashboard">
            <li
              className={`flex text-md rounded-md p-2 cursor-pointer hover:bg-white hover:text-sky-blue text-dark-green text-sm items-center gap-x-4 
                  "mt-9" "bg-light-white"
              } `}
            >
              <AiFillDashboard className="h-5 w-5" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Dashboard
              </span>
            </li>
          </Link>
          <Link to="/products">
            <li
              className={`flex text-md  rounded-md p-2 cursor-pointer hover:bg-white hover:text-sky-blue text-dark-green text-sm items-center gap-x-4 
                  "mt-9" "bg-light-white"
              } `}
            >
              <AiOutlineShopping className="h-5 w-5" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Products
              </span>
            </li>
          </Link>
          <Link to="/orders">
            <li
              className={`flex text-md  rounded-md p-2 cursor-pointer hover:bg-white hover:text-sky-blue text-dark-green text-sm items-center gap-x-4 
                  "mt-9" "bg-light-white"
               `}
            >
              <AiOutlineShoppingCart className="h-5 w-5" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                Orders
              </span>
            </li>
          </Link>

          <LogoutButton />
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
