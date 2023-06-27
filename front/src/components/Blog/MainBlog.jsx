import React from "react";
import { FaFacebookF, FaTwitter, FaGithub, FaBehance } from "react-icons/fa";
import { GoSearch } from "react-icons/go";

const MainBlog = () => {
  return (
    <section>
      <div className="container">
        <div className="flex">
          <div className="w-[400px]">
            <div className="flex bg-[#ea2c58] text-white items-center rounded-[20px]">
              <input
                type="text"
                placeholder="Search Posts"
                className="bg-[#ea2c58] focus:outline-none placeholder:text-white"
              />
              <GoSearch />
            </div>
            <div className="h-[1px] bg-[#eeeeee] w-full"></div>
            <img
              className="mx-auto"
              src="https://preview.colorlib.com/theme/kindity/img/blog/author.png.webp"
              alt=""
            />
            <div className="text-center">
              <h4>Charlie Barber</h4>
              <span>Senior blog writer</span>
              <div className="flex justify-center gap-[20px]">
                <FaFacebookF />
                <FaTwitter />
                <FaGithub />
                <FaBehance />
              </div>
            </div>
            <p className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum
              iure consectetur aliquam quis recusandae cumque animi at
              blanditiis? Tempore reprehenderit voluptatem debitis facilis
              sapiente tempora voluptatum quia illo mollitia sit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainBlog;
