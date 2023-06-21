import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  return (
    <>
      <header className="border-t">
        <div className="container">
          <div className="flex justify-between items-center py-[30px]">
            <div>
              <a href="/">
                <img
                  src="https://preview.colorlib.com/theme/kindity/img/logo.png.webp"
                  alt=""
                  className="w-full"
                />
              </a>
            </div>
            <div className="items-center gap-[80px] hidden lg:flex">
              <ul className="flex gap-[45px] uppercase text-[12px] font-medium">
                <Link to={"/"}>
                  <li className="hover:text-[#ea2c58] transition duration-500">Home</li>
                </Link>
                <Link to={"/gallery"}>
                  <li className="hover:text-[#ea2c58] transition duration-500">Gallery</li>
                </Link>
                <Link to={"/about"}>
                  <li className="hover:text-[#ea2c58] transition duration-500">About</li>
                </Link>
                <Link to={"/event"}>
                  <li className="hover:text-[#ea2c58] transition duration-500">Events</li>
                </Link>
                <Link to={"/donation"}>
                  <li className="hover:text-[#ea2c58] transition duration-500">Donation</li>
                </Link>
                <Link>
                  <li className="hover:text-[#ea2c58] transition duration-500">Blog</li>
                </Link>
                <Link>
                  <li className="hover:text-[#ea2c58] transition duration-500">Contact</li>
                </Link>
              </ul>
              <div>
                <a href="#"><AiOutlineSearch/></a>
              </div>
            </div>
            <div className="block lg:hidden"><GiHamburgerMenu className="text-[30px] text-red-500"/></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
