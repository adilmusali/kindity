import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const Stat = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get(
      "http://localhost:3000/kindity/home/statistics"
    );
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const getBackgroundColor = (color) => {
    return { backgroundColor: color };
  };

  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-[30px] sm:w-[500px] lg:w-none mx-auto lg:mx-0 
    justify-center lg:justify-between text-white py-[50px] md:py-0 md:relative md:-top-[80px]">
      {data.map((d) => {
        return (
          <div key={d._id} className="flex gap-[30px] lg:gap-3 xl:gap-0 items-center p-[30px]" style={getBackgroundColor(d.color)}>
            <div className="flex flex-col gap-4 xl:border-r xl:border-white xl:pr-[25px] xl:mr-[25px]">
              <h4 className="text-[16px] xl:text-[18px] font-medium uppercase">{d.header}</h4>
              <p className="text-[14px] sm:w-[200px] lg:w-[170px] xl:w-[200px] font-light">{d.desc}</p>
            </div>
            <div>
              <h4 className="text-[18px] font-medium">{d.number}</h4>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Stat;
