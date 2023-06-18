import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Causes = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get(
      "http://localhost:3000/kindity/home/causes"
    );
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <section className="bg-[#f9f9ff]">
      <div className="container">
        <div className="py-[120px]">
          <div className="text-center mb-[80px]">
            <h2 className="text-[25px] sm:text-[36px] font-semibold mb-[20px]">
              Our Major Causes
            </h2>
            <p className="text-[14px] text-slate-500 font-light leading-6">
              The French Revolution constituted for the conscience of the
              dominant aristocratic class a fall from innocence, and upturning
              of the natural chain of events that resounded.
            </p>
          </div>
          <div className="flex justify-center md:justify-between flex-wrap lg:flex-nowrap gap-5 lg:gap-0">
            {data.map((d) => {
                return(
            <div key={d._id} className="flex flex-col bg-white w-[70%] md:w-[48%] lg:w-[31%] relative">
              <div className="relative">
                <img
                  className="w-full"
                  src={d.img}
                  alt=""
                />
                <div className="flex w-full absolute bottom-0">
                  <div className="w-[75%] h-[3px] bg-[#ea2c58]"></div>
                  <div
                    className="w-[35px] h-[20px] bg-[#ea2c58] absolute -top-[20px] 
                text-white text-[14px] font-light px-1 right-[25%]"
                  >
                    75%
                  </div>
                  <div className="w-[25%] h-[3px] bg-white opacity-40"></div>
                </div>
              </div>
              <div className="px-[40px] pt-[30px] pb-[90px]">
                <h4 className="text-[18px] font-semibold mb-[15px]">
                  {d.header}
                </h4>
                <p className="text-[14px] text-slate-500 font-light leading-6">
                  {d.desc}
                </p>
              </div>
              <div className="w-full flex text-[14px] absolute bottom-0">
                <a
                  href="#"
                  className="bg-[#ea2c58] text-white w-[50%] font-medium px-[10px] sm:px-[30px] lg:px-[15px] xl:px-[30px] py-[15px]"
                >
                  Raised: ${d.raised}
                </a>
                <a
                  href="#"
                  className="border w-[50%] font-medium px-[10px] sm:px-[20px] lg:px-[10px] xl:px-[20px] py-[15px]"
                >
                  Total Need: ${d.need}k
                </a>
              </div>
            </div>
                )
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Causes;
