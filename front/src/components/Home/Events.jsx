import React from "react";
import { Link } from "react-router-dom";

const Events = ({ data }) => {
  return (
    <section>
      <div className="container">
        <div className="py-[120px]">
          <div className="text-center mb-[80px]">
            <h2 className="text-[36px] font-semibold mb-[20px]">
              Upcoming Events
            </h2>
            <p className="text-[14px] text-[#777777] font-light">
              If you are a serious astronomy fanatic like a lot of us are, you
              can probably remember that one event in childhood that started.
            </p>
          </div>
          <div className="flex justify-center gap-5 lg:gap-0 lg:justify-between flex-wrap lg:flex-nowrap">
            {data && data
            .slice(0,2)
            .map((d) => {
              return (
                <div
                  key={d._id}
                  className="flex gap-[30px] w-full lg:w-[48%] flex-wrap sm:flex-nowrap items-center"
                >
                  <img className="w-full sm:w-[200px] h-[200px]" src={d.img} alt="" />
                  <div className="flex flex-col gap-3">
                    <a href="#" className="text-[12px] text-[#777777] font-light hover:text-[#ea2c58] transition duration-500">
                      25th February, 2017
                    </a>
                    <Link to={`event/${d._id}`}><h4 className="text-[18px] font-semibold w-[80%] hover:text-[#ea2c58] transition duration-500">
                      {d.header}
                    </h4>
                    </Link>
                    <p className="text-[14px] text-[#777777] font-light leading-6">
                      {d.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
