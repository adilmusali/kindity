import React from "react";
import { Button3, Button4 } from "../Button";

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
            <h3 className="uppercase text-[14px] mb-[10px]">
              we need your help to serve the people
            </h3>
            <h2 className="font-semibold mb-[20px] text-[30px] md:text-[50px]">Help for victims affected by flood</h2>
            <p className="text-[14px] mx-auto w-[70%] mb-[30px] tracking-wide font-light leading-relaxed">
              If you are looking at blank cassettes on the web, you may be very
              confused at the difference in price. You may see some for as low
              as $.17 each.
            </p>
            <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-center"><Button3/><Button4/></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default First;
