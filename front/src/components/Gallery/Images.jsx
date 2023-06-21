// import React from "react";
// import axios from "axios";
// import { useEffect, useState } from "react";

// const Images = () => {
//   const [data, setData] = useState([]);

//   const getData = async () => {
//     const res = await axios.get("http://localhost:3000/kindity/gallery");
//     setData(res.data);
//   };

//   useEffect(() => {
//     getData();
//   }, []);
//   return (
//     <section>
//       <div className="container">
//         <div className="py-[120px] text-center">
//           <div className="flex justify-center gap-[30px]">
//           <div className="flex flex-col gap-[30px]">
//             {data.length > 0 &&
//               data.slice(0, 4).map((item, index) => (
//                 <div key={index} className="flex flex-col gap-[30px]">
//                   <div>
//                     {item.img && <img src={item.img} className="" alt="" />}
//                   </div>
//                 </div>
//               ))}
//               </div>
//               <div className="flex flex-col gap-[30px]">
//             {data.length > 0 &&
//               data.slice(4, 8).map((item, index) => (
//                 <div key={index} className="flex flex-col gap-[30px]">
//                   <div>
//                     {item.img && <img src={item.img} className="" alt="" />}
//                   </div>
//                 </div>
//               ))}
//               </div>
//             {/* <div className="flex flex-col gap-[30px]">
//               <div>
//                 <img src={data[0].img} className="" alt="" />
//               </div>
//               <div>
//                 <img src={data[3].img} className="" alt="" />
//               </div>
//               <div>
//                 <img src={data[6].img} className="" alt="" />
//               </div>
//               <div>
//                 <img src={data[9].img} className="" alt="" />
//               </div>
//             </div>
//             <div className="flex flex-col gap-[30px]">
//               <div>
//                 <img src={data[1].img} className="" alt="" />
//               </div>
//               <div>
//                 <img src={data[4].img} className="" alt="" />
//               </div>
//               <div>
//                 <img src={data[7].img} className="" alt="" />
//               </div>
//               <div>
//                 <img src={data[10].img} className="" alt="" />
//               </div>
//             </div>
//             <div className="flex flex-col gap-[30px]">
//               <div>
//                 <img src={data[2].img} className="" alt="" />
//               </div>
//               <div>
//                 <img src={data[5].img} className="" alt="" />
//               </div>
//               <div>
//                 <img src={data[8].img} className="" alt="" />
//               </div>
//               <div>
//                 <img src={data[11].img} className="" alt="" />
//               </div>
//             </div> */}
//           </div>
//           <div className="mt-[80px]"><button className="uppercase text-[14px] font-semibold border border-[#ea2c58] 
//           px-[30px] py-2 text-white hover:text-[#ea2c58] 
//           bg-[#ea2c58] hover:bg-white transition duration-500">load more images</button></div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Images;

import React, { useEffect, useState } from "react";
import axios from "axios";

const Images = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/kindity/gallery");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const renderImages = () => {
    const images = [];
    for (let i = 0; i < 12; i++) {
      images.push(
        <div key={i}>
          <img src={data[i]?.img} className="" alt="" />
        </div>
      );
    }
    return images;
  };

  return (
    <section>
      <div className="container">
        <div className="py-[120px] text-center">
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-[30px]">
            <div className="flex flex-col gap-[30px]">{renderImages().slice(0, 4)}</div>
            <div className="flex flex-col gap-[30px]">{renderImages().slice(4, 8)}</div>
            <div className="flex flex-col gap-[30px]">{renderImages().slice(8, 12)}</div>
          </div>
          <div className="mt-[80px]">
            <button className="uppercase text-[14px] font-semibold border border-[#ea2c58] 
            px-[30px] py-2 text-white hover:text-[#ea2c58] bg-[#ea2c58] hover:bg-white transition duration-500">
              load more images
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Images;
