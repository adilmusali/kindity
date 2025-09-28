import React, { useEffect, useState, useContext } from "react";
import {
  FaRegUser,
  FaRegComment,
} from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import BlogInfo from "../BlogInfo";
import { UserContext } from "../../../context/userContext";

const MainBlog = () => {
  const [data,setData] = useState([])
  const { user } = useContext(UserContext);


  const getData = async () => {
    const res = await axios.get("http://localhost:3000/kindity/blog/news");
    setData(res.data);
  };

  const deleteData = async(id) => {
    await axios.delete(`http://localhost:3000/kindity/blog/news/${id}`)
    await getData()
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <section className="bg-[#f9f9ff]">
      <div className="container">
        <div className="flex justify-between flex-wrap lg:flex-nowrap gap-[30px] xl:gap-0 pb-[95px]">
          <div className="flex">
            <div className="flex flex-col gap-[40px]">
              {data.map((d) => {
                return(
                  <div className="flex flex-wrap md:flex-nowrap" key={d._id}>
                <div className="text-[14px] font-light md:px-[30px] pt-[30px]">
                  <div className="mb-[20px] flex md:flex-col leading-6">
                    <div className="flex gap-1 justify-end">
                      <a href="#" className="hover:text-[#777777] duration-300">
                        {d.category1},{" "}
                      </a>
                      <a href="#" className="text-[#ea2c58]">
                        {d.category2},
                      </a>
                    </div>
                    <div className="flex gap-1 justify-end">
                      <a href="#" className="hover:text-[#777777] duration-300">
                        {d.category3},{" "}
                      </a>
                      <a href="#" className="hover:text-[#777777] duration-300">
                        {d.category4}
                      </a>
                    </div>
                  </div>
                  <ul>
                    <a href="#">
                      <li className="flex items-center mb-[15px] md:justify-end">
                        <span className="hover:text-[#ea2c58] duration-300 pr-[15px] text-[#777777]">
                          {d.user}
                        </span>
                        <FaRegUser className="text-[16px]" />
                      </li>
                    </a>
                    <a href="#">
                      <li className="flex items-center mb-[15px] md:justify-end">
                        <span className="hover:text-[#ea2c58] duration-300 pr-[15px] text-[#777777]">
                          {d.createdAt.slice(8,10)} June, {d.createdAt.slice(0,4)}
                        </span>
                        <LuCalendarDays className="text-[16px]" />
                      </li>
                    </a>
                    <a href="#">
                      <li className="flex items-center mb-[15px] md:justify-end">
                        <span className="hover:text-[#ea2c58] duration-300 pr-[15px] text-[#777777]">
                          1.2M Views
                        </span>
                        <AiOutlineEye className="text-[16px]" />
                      </li>
                    </a>
                    <a href="#">
                      <li className="flex items-center mb-[15px] md:justify-end">
                        <span className="hover:text-[#ea2c58] duration-300 pr-[15px] text-[#777777] text-[13px] xl:text-[14px]">
                          06 Comments
                        </span>
                        <FaRegComment className="text-[16px]" />
                      </li>
                    </a>
                  </ul>
                </div>
                <div className="flex flex-col lg:w-[450px] xl:w-[585px]">
                  <div>
                    <img
                      className="w-full"
                      src={d.img}
                      alt=""
                    />
                  </div>
                  <div className="py-[20px]">
                    <Link>
                      <h3 className="text-[20px] sm:text-[24px] font-semibold mb-[10px] hover:text-[#ea2c58] duration-[0.4s]">
                        {d.header}
                      </h3>
                    </Link>
                    <p className="text-[14px] font-light text-[#777777] leading-6">
                      {d.desc}
                    </p>
                  </div>
                  <div>
                    <div className="flex justify-center gap-4 sm:gap-0 sm:justify-between flex-wrap">
                    <Link to={`${d._id}`}>
                    <button
                      className="text-[14px] uppercase bg-white text-black px-[30px] py-2 font-medium
                hover:bg-[#ea2c58] hover:text-white duration-500"
                    >
                      view more
                    </button>
                    </Link>
                    {user && user.role === 'admin' && (
                      <div className="flex gap-2">
                        <Link to={"/addNews"} className="rounded-[50%] bg-lime-500 px-3 py-1 text-[20px] 
                        text-white hover:bg-lime-600 duration-300">+</Link>
                      <button
                        onClick={() => deleteData(d._id)}
                        className="text-[14px] uppercase bg-[#ea2c58] text-white px-[30px] py-2 font-medium
                  hover:bg-white hover:text-black duration-500"
                      >
                        Delete
                      </button>
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              </div>
                )
              })}
              <div className="mx-auto mt-[30px] mb-[95px] lg:mb-0">
                <Pagination count={10} color="error" className="flex flex-wrap"/>
              </div>
            </div>
          </div>
          <BlogInfo />
        </div>
      </div>
    </section>
  );
};

export default MainBlog;
