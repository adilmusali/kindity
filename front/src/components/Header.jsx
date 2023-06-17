import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="border-t">
        <div className="xl:container lg:container md:container sm:container">
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
            <div className="flex items-center gap-[80px]">
              <ul className="flex gap-[45px] uppercase text-[12px] font-medium">
                <Link to={"/"}>
                  <li className="text-[#ea2c58]">Home</li>
                </Link>
                <Link>
                  <li className="hover:text-[#ea2c58] transition duration-500">Gallery</li>
                </Link>
                <Link>
                  <li className="hover:text-[#ea2c58] transition duration-500">About</li>
                </Link>
                <Link>
                  <li className="hover:text-[#ea2c58] transition duration-500">Events</li>
                </Link>
                <Link>
                  <li className="hover:text-[#ea2c58] transition duration-500">Pages</li>
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
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
