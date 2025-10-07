import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const DetailRouting = () => {
  return (
      <div
        className="bg-[url('https://preview.colorlib.com/theme/kindity/img/banner/home-banner.jpg.webp')]
      bg-no-repeat bg-center bg-cover bg-fixed"
      >
        <div className="container">
          <div className="flex flex-col gap-5 text-white text-center py-[100px]">
            <h2 className="text-[32px] sm:text-[48px] font-bold">Event Details</h2>
            <div className="flex justify-center flex-wrap gap-2 text-[14px] font-light mx-auto">
              <Link
                to={"/"}
                className="flex flex-wrap items-center gap-2 
            text-white hover:text-[#ea2c58] transition duration-500"
              >
                Home
                <BsArrowRight />
              </Link>
              <Link
                to={"/event"}
                className="flex flex-wrap items-center gap-2 text-white hover:text-[#ea2c58] transition duration-500"
              >
                Events
                <BsArrowRight />
              </Link>
              <span className="text-white">
              Event Details
              </span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default DetailRouting