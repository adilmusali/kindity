import React from "react";
import { Link } from "react-router-dom";
import { siteCopy } from "../../content/siteCopy";

const First = () => {
  return (
    <section>
      <div
        className="bg-[url('https://preview.colorlib.com/theme/kindity/img/banner/home-banner.jpg.webp')]
      bg-no-repeat bg-center bg-cover bg-fixed"
      >
        <div className="container">
          <div className="w-[80%] text-white mx-auto 
          text-center pt-[250px] sm:pb-[250px] pb-[100px]">
            <h2 className="font-semibold mb-[20px] text-[30px] md:text-[50px]">{siteCopy.homeHeadline}</h2>
            <p className="text-[14px] mx-auto w-[70%] mb-[30px] tracking-wide font-light leading-relaxed">
              {siteCopy.homeIntroduction}
            </p>
            <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-center">
              <Link to="/donation" className="text-[14px] uppercase font-semibold px-[30px] py-3 border border-[#ea2c58] bg-[#ea2c58] hover:bg-transparent transition duration-500 w-full sm:w-[180px]">Explore giving</Link>
              <Link to="/event" className="text-[14px] font-semibold uppercase px-[30px] py-3 bg-white text-slate-900 hover:bg-[#ea2c58] hover:text-white transition duration-500 w-full sm:w-[180px]">Community events</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default First;
