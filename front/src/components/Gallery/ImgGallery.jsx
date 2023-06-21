import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const ImgGallery = () => {
  return (
    <section>
      <div
        className="bg-[url('https://preview.colorlib.com/theme/kindity/img/banner/home-banner.jpg.webp')]
      bg-no-repeat bg-center bg-cover bg-fixed"
      >
        <div className="container">
          <div className="flex flex-col gap-5 text-white text-center py-[100px]">
            <h2 className="text-[32px] sm:text-[48px] font-bold">Image Gallery</h2>
            <div className="flex gap-2 text-[14px] font-light mx-auto justify-center flex-wrap"><Link to={"/"} className="flex items-center gap-2 
            text-white hover:text-[#ea2c58] transition duration-500 flex-wrap">Home<BsArrowRight/></Link><a href="/gallery"
            className="text-white hover:text-[#ea2c58] transition duration-500">Gallery</a></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImgGallery;
