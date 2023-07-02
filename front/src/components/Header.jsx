import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [activeLink, setActiveLink] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {

    const handleScroll = () => {
      const header = document.getElementById("header");
      const toggleClass = "scrolled";
      const currentScroll = window.scrollY;

      if (currentScroll > 150) {
        // header.classList.add(toggleClass);
        setScrolled(true);
      } else {
        // header.classList.remove(toggleClass);
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <header id="header" className={`${scrolled ? "scrolled" : ""} border-t`}>
        <div className="container">
          <div className="flex flex-wrap justify-between items-center py-[30px]">
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
                  <li
                    className={`hover:text-[#ea2c58] transition duration-500 ${
                      activeLink === "home" ? "text-[#ea2c58]" : ""
                    }`}
                    onClick={() => handleLinkClick("home")}
                  >
                    Home
                  </li>
                </Link>
                <Link to={"/gallery"}>
                  <li className={`hover:text-[#ea2c58] transition duration-500 ${
                      activeLink === "gallery" ? "text-[#ea2c58]" : ""
                    }`}
                    onClick={() => handleLinkClick("gallery")}>
                    Gallery
                  </li>
                </Link>
                <Link to={"/about"}>
                  <li className={`hover:text-[#ea2c58] transition duration-500 ${
                      activeLink === "about" ? "text-[#ea2c58]" : ""
                    }`}
                    onClick={() => handleLinkClick("about")}>
                    About
                  </li>
                </Link>
                <Link to={"/event"}>
                  <li className={`hover:text-[#ea2c58] transition duration-500 ${
                      activeLink === "event" ? "text-[#ea2c58]" : ""
                    }`}
                    onClick={() => handleLinkClick("event")}>
                    Events
                  </li>
                </Link>
                <Link to={"/donation"}>
                  <li className={`hover:text-[#ea2c58] transition duration-500 ${
                      activeLink === "donation" ? "text-[#ea2c58]" : ""
                    }`}
                    onClick={() => handleLinkClick("donation")}>
                    Donation
                  </li>
                </Link>
                <Link to={"/blog"}>
                <li className={`hover:text-[#ea2c58] transition duration-500 ${
                      activeLink === "blog" ? "text-[#ea2c58]" : ""
                    }`}
                    onClick={() => handleLinkClick("blog")}>
                    Blog
                  </li>
                </Link>
                <Link to={"/contact"}>
                  <li className={`hover:text-[#ea2c58] transition duration-500 ${
                      activeLink === "contact" ? "text-[#ea2c58]" : ""
                    }`}
                    onClick={() => handleLinkClick("contact")}>
                    Contact
                  </li>
                </Link>
              </ul>
              <div>
                <a href="#">
                  <AiOutlineSearch />
                </a>
              </div>
            </div>
            <div className="block lg:hidden">
              <GiHamburgerMenu className="text-[30px] text-red-500" onClick={toggleMenu}/>
            </div>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div id="responsive-nav" className={`${scrolled ? "scrolled" : ""} bg-white py-2`}>
          <ul className="container flex flex-col gap-[25px] uppercase text-[12px] font-medium">
            <Link to={"/"}>
              <li
                className={`hover:text-[#ea2c58] transition duration-500 ${
                  activeLink === "home" ? "text-[#ea2c58]" : ""
                }`}
                onClick={() => handleLinkClick("home")}
              >
                Home
              </li>
            </Link>
            <Link to={"/gallery"}>
              <li
                className={`hover:text-[#ea2c58] transition duration-500 ${
                  activeLink === "gallery" ? "text-[#ea2c58]" : ""
                }`}
                onClick={() => handleLinkClick("gallery")}
              >
                Gallery
              </li>
            </Link>
            <Link to={"/about"}>
                  <li className={`hover:text-[#ea2c58] transition duration-500 ${
                      activeLink === "about" ? "text-[#ea2c58]" : ""
                    }`}
                    onClick={() => handleLinkClick("about")}>
                    About
                  </li>
                </Link>
                <Link to={"/event"}>
                  <li className={`hover:text-[#ea2c58] transition duration-500 ${
                      activeLink === "event" ? "text-[#ea2c58]" : ""
                    }`}
                    onClick={() => handleLinkClick("event")}>
                    Events
                  </li>
                </Link>
                <Link to={"/donation"}>
                  <li className={`hover:text-[#ea2c58] transition duration-500 ${
                      activeLink === "donation" ? "text-[#ea2c58]" : ""
                    }`}
                    onClick={() => handleLinkClick("donation")}>
                    Donation
                  </li>
                </Link>
                <Link to={"/blog"}>
                <li className={`hover:text-[#ea2c58] transition duration-500 ${
                      activeLink === "blog" ? "text-[#ea2c58]" : ""
                    }`}
                    onClick={() => handleLinkClick("blog")}>
                    Blog
                  </li>
                </Link>
                <Link to={"/contact"}>
                  <li className={`hover:text-[#ea2c58] transition duration-500 ${
                      activeLink === "contact" ? "text-[#ea2c58]" : ""
                    }`}
                    onClick={() => handleLinkClick("contact")}>
                    Contact
                  </li>
                </Link>
                <li>
                <a href="#">
                  <AiOutlineSearch  className="text-[18px]"/>
                </a>
              </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;