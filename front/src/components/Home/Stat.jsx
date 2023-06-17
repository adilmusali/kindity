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
    <div className="flex gap-[30px] justify-between text-white relative -top-[80px]">
      {data.map((d) => {
        return (
          <div key={d._id} className="flex items-center p-[30px]" style={getBackgroundColor(d.color)}>
            <div className="flex flex-col gap-4 border-r border-white pr-[25px] mr-[25px]">
              <h4 className="text-[18px] font-medium uppercase">{d.header}</h4>
              <p className="text-[14px] w-[200px] font-light">{d.desc}</p>
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
