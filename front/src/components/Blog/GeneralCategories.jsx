import React from "react";
import { siteCopy } from "../../content/siteCopy";

const GeneralCategories = ({ data }) => {
  return (
    <section className="bg-[#f9f9ff]">
      <div className="container">
        <div className="flex lg:justify-between flex-col items-center gap-[30px] lg:gap-0 lg:flex-row py-[80px]">
          {data && data.map((d) => {
            return (
              <div key={d._id}
              className="bg-no-repeat p-[20px]"
              style={{ backgroundImage: `url(${d.img})` }}>
                <div className="bg-black hover:bg-[#ea2c58] duration-500 hover:bg-opacity-70 bg-opacity-70 text-center text-white px-[30px] py-[30px] sm:w-[300px] sm:py-[50px] lg:w-[250px] lg:py-[30px] xl:w-[300px] xl:py-[50px]">
                  <h4 className="text-[18px] uppercase font-semibold mb-[20px]">
                    {d.header}
                  </h4>
                  <span className="text-[14px] border-t-2 border-t-white font-light pt-[10px]">
                    {d.desc}
                  </span>
                  {d.isDemo === true && <p className="mt-4 text-sm">Example content. {siteCopy.demoExplanation}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GeneralCategories;
