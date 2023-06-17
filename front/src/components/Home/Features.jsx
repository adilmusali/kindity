import React from "react";
import { IoDiamondOutline } from "react-icons/io5";
import { CiCoffeeCup } from "react-icons/ci";
import { TfiWheelchair } from "react-icons/tfi";
import axios from "axios";
import { useEffect, useState } from "react";

const Features = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const res = await axios.get("http://localhost:3000/kindity/home/features");
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "IoDiamondOutline":
        return <IoDiamondOutline className="text-[25px] mx-auto text-white" />;
      case "CiCoffeeCup":
        return <CiCoffeeCup className="text-[25px] mx-auto text-white" />;
      case "TfiWheelchair":
        return <TfiWheelchair className="text-[25px] mx-auto text-white" />;
      default:
        return null;
    }
  };
  return (
    <section>
      <div
        className='bg-[url("https://preview.colorlib.com/theme/kindity/img/feature-bg.jpg.webp")]
        bg-cover bg-center bg-fixed bg-no-repeat bg-slate-600 bg-blend-multiply'
      >
        <div className="container">
          <div className="py-[120px]">
            <div className="text-center">
              <h2 className="text-[36px] text-white font-semibold mb-[20px]">
                Our Key Features
              </h2>
              <p className="text-[14px] text-[#777777] font-light mx-[200px] mb-[80px] leading-6">
                The French Revolution constituted for the conscience of the
                dominant aristocratic class a fall from innocence, and upturning
                of the natural chain of events that resounded.
              </p>
            </div>
            <div className="flex justify-between text-center">
            {data.map((d) => {
                return(
                    <div
                    key={d._id}
                id="glass2"
                className="w-[31%] flex flex-col gap-[20px] px-[34px] py-[45px]"
              >
                {getIconComponent(d.logo)}
                <h4 className="uppercase font-semibold text-[18px] text-white">
                  {d.header}
                </h4>
                <p className="font-light text-[14px] text-[#777777] leading-6">
                  {d.desc}
                </p>
              </div>
                )
            })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
