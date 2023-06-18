import React from "react";
import { TbLocation } from "react-icons/tb";
import { FaFacebookF, FaTwitter, FaDribbble, FaBehance } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#04091e]">
      <div className="container">
        <div className="flex flex-col py-[145px]">
          <div className="flex flex-wrap sm:flex-nowrap justify-center gap-5 sm:justify-between text-[#777777] border-b-[1px] border-slate-700 pb-[40px]">
            <div className="flex gap-4 flex-wrap w-[40%] justify-between">
              <div className="flex flex-col gap-5 lg:w-[45%]">
                <h4 className="text-white text-[16px] font-semibold uppercase">
                  about agency
                </h4>
                <p className="text-[14px] font-light leading-6">
                  The world has become so fast paced that people don’t want to
                  stand by reading a page of information, they would much rather
                  look at a presentation and understand the message. It has come
                  to a point
                </p>
              </div>
              <div className="flex flex-col gap-5 lg:w-[45%]">
                <h4 className="text-white text-[16px] font-semibold uppercase">
                  navigation links
                </h4>
                <div className="flex flex-wrap gap-[40px] text-[14px] font-light">
                  <ul className="flex flex-col gap-4">
                    <li className="hover:text-red-500 transition duration-500">
                      <a href="#">Home</a>
                    </li>
                    <li className="hover:text-red-500 transition duration-500">
                      <a href="#">Feature</a>
                    </li>
                    <li className="hover:text-red-500 transition duration-500">
                      <a href="#">Services</a>
                    </li>
                    <li className="hover:text-red-500 transition duration-500">
                      <a href="#">Portfolio</a>
                    </li>
                  </ul>
                  <ul className="flex flex-col gap-4">
                    <li className="hover:text-red-500 transition duration-500">
                      <a href="#">Team</a>
                    </li>
                    <li className="hover:text-red-500 transition duration-500">
                      <a href="#">Pricing</a>
                    </li>
                    <li className="hover:text-red-500 transition duration-500">
                      <a href="#">Blog</a>
                    </li>
                    <li className="hover:text-red-500 transition duration-500">
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex justify-between gap-4 w-[55%] flex-wrap lg:flex-nowrap">
              <div className="flex flex-col gap-5">
                <h4 className="text-[16px] uppercase text-white font-semibold">
                  newsletter
                </h4>
                <p className="text-[14px] font-light leading-6">
                  For business professionals caught between high OEM price and
                  mediocre print and graphic output,
                </p>
                <form action="" className="flex">
                  <input
                    className="bg-inherit border border-slate-600 text-[13px] px-[20px] py-2 w-[70px] sm:w-[100px] md:w-[200px] lg:w-[250px] xl:w-[300px]"
                    placeholder="Email Adress"
                    type="email"
                  />
                  <button className="bg-[#ea2c58] text-white text-[25px] p-2">
                    <TbLocation />
                  </button>
                </form>
              </div>
              <div className="flex flex-col gap-5">
                <h4 className="text-[16px] uppercase text-white font-semibold">
                  instafeed
                </h4>
                <div className="flex flex-wrap gap-3">
                  <div>
                    <img
                      src="https://preview.colorlib.com/theme/kindity/img/instagram/Image-01.jpg.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://preview.colorlib.com/theme/kindity/img/instagram/Image-02.jpg.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://preview.colorlib.com/theme/kindity/img/instagram/Image-03.jpg.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://preview.colorlib.com/theme/kindity/img/instagram/Image-04.jpg.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://preview.colorlib.com/theme/kindity/img/instagram/Image-05.jpg.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://preview.colorlib.com/theme/kindity/img/instagram/Image-06.jpg.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://preview.colorlib.com/theme/kindity/img/instagram/Image-07.jpg.webp"
                      alt=""
                    />
                  </div>
                  <div>
                    <img
                      src="https://preview.colorlib.com/theme/kindity/img/instagram/Image-08.jpg.webp"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-[#777777] mt-[40px] items-center">
            <span className="text-[14px] font-light">
              Copyright ©2023 All rights reserved
            </span>
            <div className="flex gap-[30px] items-center">
              <FaFacebookF className="cursor-pointer hover:text-red-500 transition duration-500" />
              <FaTwitter className="cursor-pointer hover:text-red-500 transition duration-500" />
              <FaDribbble className="cursor-pointer hover:text-red-500 transition duration-500" />
              <FaBehance className="text-[20px] cursor-pointer hover:text-red-500 transition duration-500" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
