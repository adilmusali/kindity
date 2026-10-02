import React from "react";
import DemoLabel from "../DemoLabel";
import { formatUSD, getCauseProgress } from "../../utils/contentFormatters";

const Causes = ({ data }) => {
  const reviewedCauses = data?.filter((d) => typeof d.isDemo === "boolean") ?? [];
  if (reviewedCauses.length === 0) return null;

  return (
    <section className="bg-[#f9f9ff]">
      <div className="container">
        <div className="py-[120px]">
          <div className="text-center mb-[80px]">
            <h2 className="text-[25px] sm:text-[36px] font-semibold mb-[20px]">
              Community causes
            </h2>
            <p className="text-[14px] text-slate-500 font-light leading-6">
              Information about each campaign is shown with its recorded goal and contributions where available.
            </p>
          </div>
          <div className="flex justify-center md:justify-between flex-wrap lg:flex-nowrap gap-5 lg:gap-0">
            {reviewedCauses.map((d) => {
                const progress = getCauseProgress(d.raised, d.need);
                return(
            <div key={d._id} className="flex flex-col bg-white w-[70%] md:w-[48%] lg:w-[31%] relative">
              <div className="relative">
                <img
                  className="w-full"
                  src={d.img}
                  alt=""
                />
                {progress !== null && <div className="flex w-full absolute bottom-0" role="progressbar" aria-label={`${d.header} funding progress`} aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progress)}>
                  <div className="h-[3px] bg-[#ea2c58]" style={{ width: `${progress}%` }}></div>
                  <div className="h-[3px] flex-1 bg-white opacity-40"></div>
                  <span className="absolute -top-[20px] text-white text-[14px] font-light px-1" style={{ left: `calc(${progress}% - 17px)` }}>{Math.round(progress)}%</span>
                </div>}
              </div>
              <div className="px-[40px] pt-[30px] pb-[90px]">
                <h4 className="text-[18px] font-semibold mb-[15px]">
                  {d.header}
                </h4>
                <p className="text-[14px] text-slate-500 font-light leading-6">
                  {d.desc}
                </p>
                {d.isDemo === true && <DemoLabel className="mt-3" />}
              </div>
              <div className="w-full flex text-[14px] absolute bottom-0">
                <div className="bg-[#ea2c58] text-white w-[50%] font-medium px-[10px] sm:px-[30px] lg:px-[15px] xl:px-[30px] py-[15px]">Raised: {formatUSD(d.raised) ?? "Not provided"}</div>
                <div className="border w-[50%] font-medium px-[10px] sm:px-[20px] lg:px-[10px] xl:px-[20px] py-[15px]">Goal: {Number(d.need) > 0 ? formatUSD(d.need) : "Not set"}</div>
              </div>
            </div>
                )
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Causes;
