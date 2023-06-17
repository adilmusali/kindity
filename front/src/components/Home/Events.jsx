import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Events = () => {
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
          <div className="text-center">
            <h2 className="text-[36px] font-semibold mb-[20px]">
              Upcoming Events
            </h2>
            <p className="text-[14px] text-[#777777] font-light mx-[200px] mb-[80px]">
              If you are a serious astronomy fanatic like a lot of us are, you
              can probably remember that one event in childhood that started.
            </p>
          </div>
          <div className="flex justify-between">
            {data.map((d) => {
              return (
                <div
                  key={d._id}
                  className="flex gap-[30px] w-[48%] items-center"
                >
                  <img src={d.img} alt="" />
                  <div className="flex flex-col gap-3">
                    <span className="text-[12px] text-[#777777] font-light">
                      25th February, 2017
                    </span>
                    <h4 className="text-[18px] font-semibold w-[80%]">
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
  );
};

export default Events;
