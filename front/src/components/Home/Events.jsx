import React from "react";
import { Link } from "react-router-dom";
import { formatEventDate } from "../../utils/contentFormatters";
import DemoLabel from "../DemoLabel";

const Events = ({ data }) => {
  return (
    <section>
      <div className="container">
        <div className="py-[120px]">
          <div className="text-center mb-[80px]">
            <h2 className="text-[36px] font-semibold mb-[20px]">
              Community events
            </h2>
            <p className="text-[14px] text-[#777777] font-light">
              Community gatherings and activities. Check each listing for a date and demo label.
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
                    <span className="text-[12px] text-[#777777] font-light">{formatEventDate(d.eventDate)}</span>
                    <Link to={`event/${d._id}`}><h4 className="text-[18px] font-semibold w-[80%] hover:text-[#ea2c58] transition duration-500">
                      {d.header}
                    </h4>
                    </Link>
                    <p className="text-[14px] text-[#777777] font-light leading-6">
                      {d.desc}
                    </p>
                    {d.isDemo === true && <DemoLabel />}
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
