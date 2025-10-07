import React from "react";
import { BsDatabase } from "react-icons/bs";
import { RiBook3Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";

const Welcome = ({ data }) => {
  return (
    <section>
      <div className="container">
        {data && data.map((d) => {
          return (
            <div
              className="flex gap-[70px] py-[120px] items-center flex-wrap lg:flex-nowrap"
              key={d._id}
            >
              <div>
                <h3 className="text-[36px] font-semibold">{d.header}</h3>
                <p className="text-[14px] text-slate-500 font-light leading-relaxed mt-[20px] mb-[45px] mr-[70px]">
                  {d.desc}
                </p>
                <div className="flex gap-[30px] flex-wrap sm:flex-nowrap">
                  <div className="border px-[25px] md:pl-[25px] md:pr-[80px] lg:px-[25px] w-full sm:w-none py-[30px]">
                    <BsDatabase className="text-[#ea2c58] text-[24px]" />
                    <h4 className="text-[24px] font-semibold mt-[15px] mb-[5px]">
                      ${d.donation}M
                    </h4>
                    <span className="text-[14px] text-slate-500 font-light">
                      Total Donation
                    </span>
                  </div>
                  <div className="border px-[25px] md:pl-[25px] md:pr-[80px] lg:px-[25px] w-full sm:w-none py-[30px]">
                    <RiBook3Line className="text-[#ea2c58] text-[24px]" />
                    <h4 className="text-[24px] font-semibold mt-[15px] mb-[5px]">
                      {d.projects}
                    </h4>
                    <span className="text-[14px] text-slate-500 font-light">
                      Total Projects
                    </span>
                  </div>
                  <div className="border px-[25px] md:pl-[25px] md:pr-[80px] lg:px-[25px] w-full sm:w-none py-[30px]">
                    <FiUsers className="text-[#ea2c58] text-[24px]" />
                    <h4 className="text-[24px] font-semibold mt-[15px] mb-[5px]">
                      {d.volunteers}
                    </h4>
                    <span className="text-[14px] text-slate-500 font-light">
                      Total Volunteers
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:bg-gray-100 w-[500px] lg:w-[1500px] xl:w-[1600px] h-[280px] xl:h-[360px] relative">
                <div className="md:w-[450px] lg:w-[350px] xl:w-[450px] absolute left-7 -top-[30px]">
                  <img className="w-full" src={d.img} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Welcome;
