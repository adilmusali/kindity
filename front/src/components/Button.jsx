import React from "react";

export const Button1 = () => {
  return (
    <button
      className="bg-slate-100 px-5 py-1 border text-slate-500
            hover:bg-[#ea2c58] hover:border-[#ea2c58] hover:text-white transition duration-500"
    >
      My Account
    </button>
  );
};

export const Button2 = () => {
  return (
    <button
      className="px-5 py-1 text-white bg-[#ea2c58] 
hover:bg-white hover:text-slate-500 border border-[#ea2c58] transition duration-500"
    >
      Donate Now
    </button>
  );
};

export const Button3 = () => {
  return (
    <button className="text-[14px] uppercase font-semibold px-[30px] py-3 border 
    border-[#ea2c58] bg-[#ea2c58] 
    hover:bg-transparent hover:text-[#ea2c58] transition duration-500
    w-full sm:w-[180px]">
        Donate Now
    </button>
  );
};

export const Button4 = () => {
  return (
    <button id="glass" className="text-[14px] font-semibold uppercase px-[30px] py-3
    w-full sm:w-[180px]">
        View Activity
    </button>
  );
};
