import React from 'react'
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const DetailRouting = () => {
  const [data, setData] = useState("");
    const params = useParams();
  
    const getData = async () => {
      const res = await axios.get(`http://localhost:3000/kindity/home/events/${params.id}`);
      setData(res.data);
    };
  
    useEffect(() => {
      getData();
    }, []);

  return (
      <div
        className="bg-[url('https://preview.colorlib.com/theme/kindity/img/banner/home-banner.jpg.webp')]
      bg-no-repeat bg-center bg-cover bg-fixed"
      >
        <div className="container">
          <div className="flex flex-col gap-5 text-white text-center py-[100px]">
            <h2 className="text-[32px] sm:text-[48px] font-bold">Event Details</h2>
            <div className="flex justify-center flex-wrap gap-2 text-[14px] font-light mx-auto">
              <Link
                to={"/"}
                className="flex flex-wrap items-center gap-2 
            text-white hover:text-[#ea2c58] transition duration-500"
              >
                Home
                <BsArrowRight />
              </Link>
              <Link
                to={"/event"}
                className="flex flex-wrap items-center gap-2 text-white hover:text-[#ea2c58] transition duration-500"
              >
                Events
                <BsArrowRight />
              </Link>
              <a
                href={data._id}
                className="text-white hover:text-[#ea2c58] transition duration-500"
              >
                Events Details
              </a>
            </div>
          </div>
        </div>
      </div>
  )
}

export default DetailRouting