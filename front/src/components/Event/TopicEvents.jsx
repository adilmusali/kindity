import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

const TopicEvents = () => {
    const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/kindity/home/events");
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <section>
      <div className="container">
        <div className="py-[120px]">
          <div className="flex justify-center gap-[30px] lg:justify-between flex-wrap">
            {data
            .map((d) => {
              return (
                <div
                  key={d._id}
                  className="flex gap-[30px] w-full lg:w-[48%] flex-wrap sm:flex-nowrap items-center"
                >
                  <img className="w-full sm:w-[260px] sm:h-[220px] sm:w-none" src={d.img} alt="" />
                  <div className="flex flex-col gap-3">
                    <span className="text-[12px] text-[#777777] font-light">
                      25th February, 2017
                    </span>
                    <h4 className="text-[18px] font-semibold">
                      {d.header}
                    </h4>
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
  )
}

export default TopicEvents