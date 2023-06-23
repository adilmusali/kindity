import React from "react";
import { BiHome, BiPhone, BiEnvelope } from "react-icons/bi";

const SendMessage = () => {
  // const getIconComponent = (iconName) => {
  //   switch (iconName) {
  //     case "IoDiamondOutline":
  //       return <BiHome className="text-[25px] mx-auto text-white" />;
  //     case "CiCoffeeCup":
  //       return <BiPhone className="text-[25px] mx-auto text-white" />;
  //     case "TfiWheelchair":
  //       return <BiEnvelope className="text-[25px] mx-auto text-white" />;
  //     default:
  //       return null;
  //   }

  return (
    <section>
      <div className="container">
        <div className="flex flex-wrap gap-[50px] lg:gap-[30px] xl:gap-0 lg:flex-nowrap justify-between py-[120px]">
          <div className="flex flex-col gap-[30px]">
            <div className="flex gap-5">
              <BiHome  className="text-[#ea2c58] text-[22px]"/>
              <div>
                <h4 className="text-[16px] font-light">California, United States</h4>
                <p className="text-[14px] text-[#777777] font-light">Santa monica bullevard</p>
              </div>
            </div>
            <div className="flex gap-5">
              <BiPhone  className="text-[#ea2c58] text-[22px]"/>
              <div>
                <h4 className="text-[16px] font-light">00 (440) 9865 562</h4>
                <p className="text-[14px] text-[#777777] font-light">Mon to Fri 9am to 6 pm</p>
              </div>
            </div>
            <div className="flex gap-5">
              <BiEnvelope  className="text-[#ea2c58] text-[22px]"/>
              <div>
                <h4 className="text-[16px] font-light">support@colorlib.com</h4>
                <p className="text-[14px] text-[#777777] font-light">Send us your query anytime!</p>
              </div>
            </div>
          </div>
          <form action="" className="flex w-[870px] gap-[15px] md:gap-[30px] flex-wrap md:flex-nowrap">
            <div className="flex flex-col w-full gap-[15px]">
              <input
                type="text"
                className="border text-[13px] text-[#999] py-2 px-5 focus:outline-none"
                placeholder="Enter your name"
              />
              <input
                type="text"
                className="border text-[13px] text-[#999] py-2 px-5 focus:outline-none"
                placeholder="Enter email address"
              />
              <input
                type="text"
                className="border text-[13px] text-[#999] py-2 px-5 focus:outline-none"
                placeholder="Enter Subject "
              />
            </div>
            <div className="w-full">
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Enter Message"
                className="border w-full h-[140px] text-[13px] 
                text-[#999] focus:outline-none resize-none py-2 px-5"
              ></textarea>
              <div className="flex flex-row-reverse">
                <button
                  className="mt-[30px] text-[14px] uppercase font-semibold px-[30px] py-2 border 
                border-[#ea2c58] bg-[#ea2c58] 
                hover:bg-transparent text-white hover:text-[#ea2c58] transition duration-500"
                >
                  send message
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SendMessage;
