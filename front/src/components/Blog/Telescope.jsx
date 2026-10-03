import React from "react";
import { siteCopy } from "../../content/siteCopy";
import DemoLabel from "../DemoLabel";

const Telescope = () => (
  <section>
    <div className='bg-[url("https://preview.colorlib.com/theme/kindity/img/banner/banner-2.jpg.webp")] bg-top bg-fixed bg-no-repeat bg-slate-500 bg-blend-multiply'>
      <div className="container">
        <div className="py-[200px] md:py-[240px]">
          <div className="flex flex-col text-white text-center w-auto md:w-[85%] lg:w-[65%] xl:w-[55%] mx-auto">
            <h2 className="text-[40px] md:text-[60px] font-semibold">{siteCopy.blogHeadline}</h2>
            <p className="text-[16px] font-light mb-4">{siteCopy.blogIntroduction}</p>
            <DemoLabel className="text-white" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Telescope;
