import React from "react";
import { IoDiamondOutline } from "react-icons/io5";
import { CiCoffeeCup } from "react-icons/ci";
import { TfiWheelchair } from "react-icons/tfi";
import DemoLabel from "../DemoLabel";

const Features = () => {
  const examples = [
    { icon: <IoDiamondOutline className="text-[25px] mx-auto text-white" />, title: "Food support", description: "Explore example ways neighbors can share food and household essentials." },
    { icon: <CiCoffeeCup className="text-[25px] mx-auto text-white" />, title: "Learning together", description: "Consider illustrative activities for sharing learning materials and skills." },
    { icon: <TfiWheelchair className="text-[25px] mx-auto text-white" />, title: "Community volunteering", description: "Discover sample ideas for offering time and care in a community." },
  ];
  return (
    <section>
      <div
        className='bg-[url("https://preview.colorlib.com/theme/kindity/img/feature-bg.jpg.webp")]
        bg-cover bg-center bg-fixed bg-no-repeat bg-slate-600 bg-blend-multiply'
      >
        <div className="container">
          <div className="py-[120px]">
            <div className="text-center mb-[80px]">
              <h2 className="text-[25px] sm:text-[36px] text-white font-semibold mb-[20px]">
                Ways to support a community
              </h2>
              <p className="text-[14px] text-slate-100 font-light leading-6">
                These are illustrative ideas. Programs and services have not been verified.
              </p>
              <DemoLabel className="mt-3 text-white" />
            </div>
            <div className="flex gap-[50px] lg:gap-0 justify-center lg:justify-between text-center flex-wrap lg:flex-nowrap">
            {examples.map((example) => (
                    <div
                    key={example.title}
                id="glass2"
                className="w-[80%] md:w-[60%] lg:w-[31%] flex flex-col gap-[20px] px-[34px] py-[45px]"
              >
                {example.icon}
                <h4 className="uppercase font-semibold text-[18px] text-white">
                  {example.title}
                </h4>
                <p className="font-light text-[14px] text-slate-100 leading-6">
                  {example.description}
                </p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
