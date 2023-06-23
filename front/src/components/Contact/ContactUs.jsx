import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <section>
      <div
        className="bg-[url('https://preview.colorlib.com/theme/kindity/img/banner/home-banner.jpg.webp')]
      bg-no-repeat bg-center bg-cover bg-fixed"
      >
        <div className="container">
          <div className="flex flex-col gap-5 text-white text-center py-[100px]">
            <h2 className="text-[32px] sm:text-[48px] font-bold">Contact Us</h2>
            <div className="flex gap-2 text-[14px] font-light mx-auto flex-wrap justify-center">
              <Link
                to={"/"}
                className="flex items-center gap-2 
            text-white hover:text-[#ea2c58] transition duration-500"
              >
                Home
                <BsArrowRight />
              </Link>
              <a
                href="/contact"
                className="text-white hover:text-[#ea2c58] transition duration-500"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactUs