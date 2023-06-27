import React from "react";

const Telescope = () => {
  return (
    <section>
      <div
        className='bg-[url("https://preview.colorlib.com/theme/kindity/img/banner/banner-2.jpg.webp")] 
        bg-top bg-fixed bg-no-repeat bg-slate-500 bg-blend-multiply'
      >
        <div className="container">
          <div className="py-[300px]">
            <div className="flex flex-col text-white text-center w-auto md:w-[85%] lg:w-[65%] xl:w-[55%] mx-auto">
              <h2 className="text-[40px] md:text-[60px] font-semibold">
                Dude You’re Getting a Telescope
              </h2>
              <p className="text-[16px] font-light mb-[40px]">
                There is a moment in the life of any aspiring astronomer that it
                is time to buy that first
              </p>
              <div>
                <button
                  className="text-[14px] uppercase bg-white text-black px-[30px] py-2 font-medium
              hover:bg-[#ea2c58] hover:text-white duration-500"
                >
                  view more
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Telescope;
