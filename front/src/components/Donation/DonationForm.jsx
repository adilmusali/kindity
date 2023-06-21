import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

const DonationForm = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/kindity/donation");
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section>
      <div className="container">
        <div className="py-[120px]">
          <div className="flex flex-wrap gap-[40px] lg:gap-0 lg:flex-nowrap lg:justify-between">
            <div className="flex flex-col gap-[40px]">
              {data.map((d) => {
                return (
                  <div key={d._id}>
                    <h4 className="text-[20px] font-semibold pb-[15px]">{d.header}</h4>
                    <p className="text-[14px] font-light text-[#777777] leading-6 lg:w-[500px]">
                      {d.desc}
                    </p>
                  </div>
                );
              })}
            </div>
              <form action="" className="flex flex-col gap-[15px] justify-center w-full xl:w-[560px]">
                <select className="border text-[#999999] text-[13px] 
                px-[20px] py-[10px] focus:outline-none" name="" id="">
                  <option value="">Project you want to donate</option>
                  <option value="">Project you want to donate</option>
                  <option value="">Project you want to donate</option>
                  <option value="">Project you want to donate</option>
                </select>
                <div className="flex flex-col lg:flex-row justify-between gap-[15px]">
                  <input className="border text-[13px] px-[20px] py-[10px] 
                  focus:outline-none focus:ring transition duration-100 w-full" type="text" placeholder="Name" />
                  <input className="border text-[13px] px-[20px] py-[10px] 
                  focus:outline-none focus:ring transition duration-100 w-full" type="email" placeholder="Email" />
                </div>
                <input
                  className="border text-[13px] px-[20px] py-[10px] 
                  focus:outline-none focus:ring transition duration-100"
                  type="number"
                  placeholder="Donation amount(USD)"
                />
                <textarea
                  className="border text-[13px] px-[20px] py-[10px] 
                  focus:outline-none focus:ring transition duration-100 resize-none h-[120px]"
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Message"
                ></textarea>
                <div className="flex flex-row-reverse">
                  <button
                    className="text-[14px] uppercase font-semibold px-[30px] py-2 border 
                border-[#ea2c58] bg-[#ea2c58] 
                hover:bg-transparent text-white hover:text-[#ea2c58] transition duration-500"
                  >
                    Donate Now
                  </button>
                </div>
              </form>
          </div>
          <div className="flex justify-center items-center gap-5 pt-[70px] flex-wrap">
            <span className="text-[14px] font-light text-[#777777]">We Accept:</span>
            <div><img
              src="https://preview.colorlib.com/theme/kindity/img/master-card.png.webp"
              alt=""
            /></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationForm;
