import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";

const Logos = () => {
    const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/kindity/home/logo");
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <section>
        <div className="container">
            <div className="flex flex-wrap justify-center gap-[80px] lg:gap-0 lg:justify-between py-[120px] px-[30px]">
                {data.map((d) => {
                    return(
                        <div key={d._id}>
                            <img className='opacity-50 hover:opacity-100 transition duration-500' src={d.img} alt="" />
                        </div>
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default Logos