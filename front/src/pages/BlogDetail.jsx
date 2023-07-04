import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegUser, FaRegComment, FaEnvelope } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { LuCalendarDays } from "react-icons/lu";
import { FaFacebookF, FaTwitter, FaGithub, FaBehance } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { Helmet } from "react-helmet";

const BlogDetail = () => {
  const [data, setData] = useState("");
  const params = useParams();

  const getData = async () => {
    const res = await axios.get(
      `http://localhost:3000/kindity/blog/news/${params.id}`
    );
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="bg-[#f9f9ff]">
      <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog Detail</title>
    </Helmet>
        <div className="flex justify-between py-[120px] flex-wrap lg:flex-nowrap">
          <div className="flex flex-col w-full lg:w-[630px] xl:w-[770px] mb-[80px]">
            <div>
              <img className="w-full" src={data.img} alt="" />
            </div>
            <div className="flex mt-[20px] md:flex-nowrap flex-wrap">
              <div className="mt-[6px] mb-[50px] md:mb-0">
                <div className="text-[14px] font-light md:px-[30px]">
                  <div className="mb-[20px] flex md:flex-col leading-6 flex-wrap sm:flex-nowrap">
                    <div className="flex gap-1 justify-end">
                      <a href="#" className="hover:text-[#777777] duration-300">
                        {data.category1},{" "}
                      </a>
                      <a href="#" className="text-[#ea2c58]">
                        {data.category2},
                      </a>
                    </div>
                    <div className="flex gap-1 justify-end">
                      <a href="#" className="hover:text-[#777777] duration-300">
                        {data.category3},{" "}
                      </a>
                      <a href="#" className="hover:text-[#777777] duration-300">
                        {data.category4}
                      </a>
                    </div>
                  </div>
                  <ul>
                    <a href="#">
                      <li className="flex items-center mb-[15px] md:justify-end">
                        <span className="hover:text-[#ea2c58] duration-300 pr-[15px] text-[#777777]">
                          {data.user}
                        </span>
                        <FaRegUser className="text-[16px]" />
                      </li>
                    </a>
                    <a href="#">
                      <li className="flex items-center mb-[15px] md:justify-end">
                        <span className="hover:text-[#ea2c58] duration-300 pr-[15px] text-[#777777]">
                          12 Dec, 2017
                        </span>
                        <LuCalendarDays className="text-[16px]" />
                      </li>
                    </a>
                    <a href="#">
                      <li className="flex items-center mb-[15px] md:justify-end">
                        <span className="hover:text-[#ea2c58] duration-300 pr-[15px] text-[#777777]">
                          {data.view}M Views
                        </span>
                        <AiOutlineEye className="text-[16px]" />
                      </li>
                    </a>
                    <a href="#">
                      <li className="flex items-center mb-[15px] md:justify-end">
                        <span className="hover:text-[#ea2c58] duration-300 pr-[15px] text-[#777777] text-[13px] xl:text-[14px]">
                          {data.comment} Comments
                        </span>
                        <FaRegComment className="text-[16px]" />
                      </li>
                    </a>
                  </ul>
                </div>
                <div className="flex justify-center items-center text-[#cccccc] gap-[17px] mt-[20px] text-[14px]">
                  <a href="#">
                    <FaFacebookF className="hover:text-black duration-300" />
                  </a>
                  <a href="#">
                    <FaTwitter className="hover:text-black duration-300" />
                  </a>
                  <a href="#">
                    <FaGithub className="hover:text-black duration-300" />
                  </a>
                  <a href="#">
                    <FaBehance className="text-[14px] hover:text-black duration-300" />
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-[20px] sm:text-[24px] font-semibold mb-[10px]">
                  {data.header}
                </h3>
                <p className="text-[14px] font-light text-[#777777] leading-6 mb-[10px]">
                  {data.desc}
                </p>
                <p className="text-[14px] font-light text-[#777777] leading-6 mb-[10px]">
                  {data.desc}
                </p>
                <p className="text-[14px] font-light text-[#777777] leading-6">
                  {data.desc}
                </p>
              </div>
            </div>
            <p className="italic text-[#777777] font-light text-[14px] leading-6 p-[30px] bg-white shadow mt-[40px] mb-[30px]">
              MCSE boot camps have its supporters and its detractors. Some
              people do not understand why you should have to spend money on
              boot camp when you can get the MCSE study materials yourself at a
              fraction of the camp price. However, who has the willpower to
              actually sit through a self-imposed MCSE training.
            </p>
            <div className="flex justify-between gap-5 md:gap-0 mb-[30px]">
              <div>
                <img
                  className="lg:w-[290px] xl:w-auto"
                  src="https://preview.colorlib.com/theme/kindity/img/blog/post-img1.jpg.webp"
                  alt=""
                />
              </div>
              <div>
                <img
                  className="lg:w-[290px] xl:w-auto"
                  src="https://preview.colorlib.com/theme/kindity/img/blog/post-img2.jpg.webp"
                  alt=""
                />
              </div>
            </div>
            <p className="text-[14px] font-light text-[#777777] leading-6 mb-[20px]">
              {data.desc}
            </p>
            <p className="text-[14px] font-light text-[#777777] leading-6">
              {data.desc}
            </p>
            <div className="flex flex-col gap-5 md:flex-row justify-between border-t mt-[80px] mb-[50px] pt-[30px]">
              <div className="flex items-center gap-5">
                <img
                  src="https://preview.colorlib.com/theme/kindity/img/blog/prev.jpg.webp"
                  alt=""
                />
                <div className="flex flex-col">
                  <span className="text-[14px] font-light text-[#777777]">
                    Prev Post
                  </span>
                  <a href="#" className="text-[18px] font-semibold">
                    Space The Final Frontier
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-5 justify-end">
                <div className="flex flex-col items-end">
                  <span className="text-[14px] font-light text-[#777777]">
                    Next Post
                  </span>
                  <a href="#" className="text-[18px] font-semibold">
                    Telescopes 101
                  </a>
                </div>
                <img
                  src="https://preview.colorlib.com/theme/kindity/img/blog/next.jpg.webp"
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col w-full border px-[10px] sm:px-[30px] py-[50px]">
              <h4 className="text-[18px] font-semibold text-center mb-[50px]">
                05 Comments
              </h4>
              <div className="flex flex-col gap-[50px]">
              <div className="flex justify-between">
                <div className="flex gap-5">
                  
                    <img
                    className="w-[60px] h-[60px]"
                      src="https://preview.colorlib.com/theme/kindity/img/blog/c1.jpg.webp"
                      alt=""
                    />
                  
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <a href="#" className="text-[12px] sm:text-[16px] font-normal mb-[3px]">
                        Emily Blunt
                      </a>
                    </div>
                    <span className="text-[11px] sm:text-[13px] text-[#cccccc] font-light mb-[15px]">
                      December 4, 2017 at 3:12 pm
                    </span>
                    <p className="text-[10px] sm:text-[14px] font-light text-[#777777]">
                      Lorem ipsum dolor sit amet consectetur adipisicing.
                    </p>
                  </div>
                </div>
                <div>
                  <button className="uppercase font-semibold px-5  py-1 border text-[12px] hover:text-white bg-white hover:bg-[#ea2c58] duration-300">
                    reply
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-5">
                  
                    <img className="w-[60px] h-[60px]"
                      src="https://preview.colorlib.com/theme/kindity/img/blog/c2.jpg.webp"
                      alt=""
                    />
                  
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <a href="#" className="text-[12px] sm:text-[16px] font-normal mb-[3px]">
                      Elsie Cunningham
                      </a>
                    </div>
                    <span className="text-[11px] sm:text-[13px] text-[#cccccc] font-light mb-[15px]">
                      December 4, 2017 at 3:12 pm
                    </span>
                    <p className="text-[10px] sm:text-[14px] font-light text-[#777777]">
                      Lorem ipsum dolor sit amet consectetur adipisicing.
                    </p>
                  </div>
                </div>
                <div>
                  <button className="uppercase font-semibold px-5  py-1 border text-[12px] hover:text-white bg-white hover:bg-[#ea2c58] duration-300">
                    reply
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-5">
                  
                    <img className="w-[60px] h-[60px]"
                      src="https://preview.colorlib.com/theme/kindity/img/blog/c3.jpg.webp"
                      alt=""
                    />
                  
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <a href="#" className="text-[12px] sm:text-[16px] font-normal mb-[3px]">
                      Annie Stephans
                      </a>
                    </div>
                    <span className="text-[11px] sm:text-[13px] text-[#cccccc] font-light mb-[15px]">
                      December 4, 2017 at 3:12 pm
                    </span>
                    <p className="text-[10px] sm:text-[14px] font-light text-[#777777]">
                      Lorem ipsum dolor sit amet consectetur adipisicing.
                    </p>
                  </div>
                </div>
                <div>
                  <button className="uppercase font-semibold px-5  py-1 border text-[12px] hover:text-white bg-white hover:bg-[#ea2c58] duration-300">
                    reply
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-5">
                  
                    <img className="w-[60px] h-[60px]"
                      src="https://preview.colorlib.com/theme/kindity/img/blog/c4.jpg.webp"
                      alt=""
                    />
                  
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <a href="#" className="text-[12px] sm:text-[16px] font-normal mb-[3px]">
                      Maria Luna
                      </a>
                    </div>
                    <span className="text-[11px] sm:text-[13px] text-[#cccccc] font-light mb-[15px]">
                      December 4, 2017 at 3:12 pm
                    </span>
                    <p className="text-[10px] sm:text-[14px] font-light text-[#777777]">
                      Lorem ipsum dolor sit amet consectetur adipisicing.
                    </p>
                  </div>
                </div>
                <div>
                  <button className="uppercase font-semibold px-5  py-1 border text-[12px] hover:text-white bg-white hover:bg-[#ea2c58] duration-300">
                    reply
                  </button>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-5">
                  
                    <img className="w-[60px] h-[60px]"
                      src="https://preview.colorlib.com/theme/kindity/img/blog/c5.jpg.webp"
                      alt=""
                    />
                  
                  <div className="flex flex-col">
                    <div className="flex justify-between">
                      <a href="#" className="text-[12px] sm:text-[16px] font-normal mb-[3px]">
                      Ina Hayes
                      </a>
                    </div>
                    <span className="text-[11px] sm:text-[13px] text-[#cccccc] font-light mb-[15px]">
                      December 4, 2017 at 3:12 pm
                    </span>
                    <p className="text-[10px] sm:text-[14px] font-light text-[#777777]">
                      Lorem ipsum dolor sit amet consectetur adipisicing.
                    </p>
                  </div>
                </div>
                <div>
                  <button className="uppercase font-semibold px-5  py-1 border text-[12px] hover:text-white bg-white hover:bg-[#ea2c58] duration-300">
                    reply
                  </button>
                </div>
              </div>
              </div>
            </div>
            <form className="flex flex-col gap-4 text-[14px] mt-[50px] border px-[30px] py-[45px]">
              <h4 className="text-center text-[18px] font-semibold">Leave a Reply</h4>
              <div className="flex gap-5"><input className="px-5 py-2 w-full focus:outline-none" type="text" placeholder="Enter Name"/><input className="px-5 py-2 w-full focus:outline-none" type="email" placeholder="Enter email address"/></div>
              <input className="px-5 py-2 focus:outline-none" type="text" placeholder="Subject"/>
              <textarea className="px-5 py-2 h-[140px] focus:outline-none resize-none" name="" id="" cols="30" rows="10" placeholder="Message"></textarea>
              <div className="mx-auto"><button
              type="submit"
                  className="text-[14px] uppercase font-semibold px-[30px] py-2 border 
                border-[#ea2c58] bg-[#ea2c58] 
                hover:bg-transparent text-white hover:text-[#ea2c58] transition duration-500"
                >
                  post comment
                </button></div>
            </form>
          </div>
          <div className="w-full lg:w-[290px] xl:w-[360px]">
            <div className="border p-[30px]">
              <div>
                <div className="rounded-[20px] relative mb-[30px]">
                  <input
                    type="text"
                    placeholder="Search Posts"
                    className="bg-[#ea2c58] focus:outline-none 
                placeholder:text-white w-full rounded-[20px] px-5 py-[10px] text-[14px] font-light text-white"
                  />
                  <GoSearch className="absolute right-5 top-3 text-white" />
                </div>
                <div className="h-[1px] bg-[#eeeeee] w-full mb-[30px]"></div>
                <img
                  className="mx-auto"
                  src="https://preview.colorlib.com/theme/kindity/img/blog/author.png.webp"
                  alt=""
                />
                <div className="text-center py-[25px]">
                  <h4 className="text-[18px] font-semibold">Charlie Barber</h4>
                  <span className="text-[14px] font-light text-[#777777]">
                    Senior blog writer
                  </span>
                  <div className="flex justify-center items-center gap-[24px] mt-[10px] text-[12px]">
                    <a href="#">
                      <FaFacebookF className="hover:text-[#ea2c58] duration-300" />
                    </a>
                    <a href="#">
                      <FaTwitter className="hover:text-[#ea2c58] duration-300" />
                    </a>
                    <a href="#">
                      <FaGithub className="hover:text-[#ea2c58] duration-300" />
                    </a>
                    <a href="#">
                      <FaBehance className="text-[14px] hover:text-[#ea2c58] duration-300" />
                    </a>
                  </div>
                </div>
                <p className="text-center text-[14px] font-light text-[#777777] leading-6">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Laborum iure consectetur aliquam quis recusandae cumque animi
                  at blanditiis? Tempore reprehenderit voluptatem debitis
                  facilis sapiente tempora voluptatum quia illo mollitia sit.
                </p>
              </div>
              <div>
                <div className="h-[1px] bg-[#eeeeee] w-full mt-[30px]"></div>
                <div>
                  <h4 className="text-[18px] bg-[#ea2c58] text-white text-center py-2 font-semibold mt-[30px]">
                    Popular Posts
                  </h4>
                  <div className="flex flex-col">
                    <div className="flex gap-5 items-center mt-[30px]">
                      <img
                        src="https://preview.colorlib.com/theme/kindity/img/blog/popular-post/post1.jpg.webp"
                        alt=""
                      />
                      <div className="flex flex-col gap-2">
                        <a
                          href="#"
                          className="text-[14px] font-semibold hover:text-[#ea2c58] duration-300"
                        >
                          Space The Final Frontier
                        </a>
                        <span className="text-[12px] font-light text-[#777777]">
                          02 Hours Ago
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center mt-[30px]">
                      <img
                        src="https://preview.colorlib.com/theme/kindity/img/blog/popular-post/post2.jpg.webp"
                        alt=""
                      />
                      <div className="flex flex-col gap-2">
                        <a
                          href="#"
                          className="text-[14px] font-semibold hover:text-[#ea2c58] duration-300"
                        >
                          The Amazing Hubble
                        </a>
                        <span className="text-[12px] font-light text-[#777777]">
                          02 Hours Ago
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center mt-[30px]">
                      <img
                        src="https://preview.colorlib.com/theme/kindity/img/blog/popular-post/post3.jpg.webp"
                        alt=""
                      />
                      <div className="flex flex-col gap-2">
                        <a
                          href="#"
                          className="text-[14px] font-semibold hover:text-[#ea2c58] duration-300"
                        >
                          Astronomy Or Astrology
                        </a>
                        <span className="text-[12px] font-light text-[#777777]">
                          03 Hours Ago
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-5 items-center mt-[30px]">
                      <img
                        src="https://preview.colorlib.com/theme/kindity/img/blog/popular-post/post4.jpg.webp"
                        alt=""
                      />
                      <div className="flex flex-col gap-2">
                        <a
                          href="#"
                          className="text-[14px] font-semibold hover:text-[#ea2c58] duration-300"
                        >
                          Asteroids telescope
                        </a>
                        <span className="text-[12px] font-light text-[#777777]">
                          01 Hours Ago
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="h-[1px] bg-[#eeeeee] w-full mt-[30px]"></div>
                <div>
                  <h4 className="text-[18px] bg-[#ea2c58] text-white text-center py-2 font-semibold mt-[30px]">
                    Post Categories
                  </h4>
                  <div className="flex flex-col text-[14px] text-[#777777] font-light mt-[15px]">
                    <a
                      href="#"
                      className="flex justify-between border-b-2 border-dotted py-[15px] hover:border-[#ea2c58] duration-300 hover:text-[#ea2c58]"
                    >
                      <span>Technology</span>
                      <span>37</span>
                    </a>
                    <a
                      href="#"
                      className="flex justify-between border-b-2 border-dotted py-[15px] hover:border-[#ea2c58] duration-300 hover:text-[#ea2c58]"
                    >
                      <span>Lifestyle</span>
                      <span>24</span>
                    </a>
                    <a
                      href="#"
                      className="flex justify-between border-b-2 border-dotted py-[15px] hover:border-[#ea2c58] duration-300 hover:text-[#ea2c58]"
                    >
                      <span>Fashion</span>
                      <span>59</span>
                    </a>
                    <a
                      href="#"
                      className="flex justify-between border-b-2 border-dotted py-[15px] hover:border-[#ea2c58] duration-300 hover:text-[#ea2c58]"
                    >
                      <span>Art</span>
                      <span>29</span>
                    </a>
                    <a
                      href="#"
                      className="flex justify-between border-b-2 border-dotted py-[15px] hover:border-[#ea2c58] duration-300 hover:text-[#ea2c58]"
                    >
                      <span>Food</span>
                      <span>15</span>
                    </a>
                    <a
                      href="#"
                      className="flex justify-between border-b-2 border-dotted py-[15px] hover:border-[#ea2c58] duration-300 hover:text-[#ea2c58]"
                    >
                      <span>Architecture</span>
                      <span>09</span>
                    </a>
                    <a
                      href="#"
                      className="flex justify-between border-b-2 border-dotted py-[15px] hover:border-[#ea2c58] duration-300 hover:text-[#ea2c58]"
                    >
                      <span>Adventure</span>
                      <span>44</span>
                    </a>
                  </div>
                </div>
              </div>
              <div>
                <div className="h-[1px] bg-[#eeeeee] w-full mt-[30px]"></div>
                <div>
                  <h4 className="text-[18px] bg-[#ea2c58] text-white text-center py-2 font-semibold mt-[30px]">
                    Newsletter
                  </h4>
                  <div className="mt-[30px]">
                    <p className="text-[14px] font-light text-[#777777] leading-6 text-center">
                      Here, I focus on a range of items and features that we use
                      in life without giving them a second thought.
                    </p>
                    <form className="flex text-[12px] relative mt-[20px]">
                      <FaEnvelope className="absolute top-[11px] left-[15px] text-[#777777]" />
                      <input
                        className="w-full py-2 px-[40px] focus:outline-none border"
                        type="email"
                        placeholder="Enter email"
                      />
                      <button
                        className="bg-[#ea2c58] text-white px-5 font-medium"
                        type="submit"
                      >
                        Subscribe
                      </button>
                    </form>
                    <p className="text-[12px] text-[#777777] font-light text-center mt-[10px]">
                      You can unsubscribe at any time
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="h-[1px] bg-[#eeeeee] w-full mt-[30px]"></div>
                <h4 className="text-[18px] bg-[#ea2c58] text-white text-center py-2 font-semibold mt-[30px]">
                  Tag Clouds
                </h4>
                <div className="text-[12px] mt-[30px] font-light flex flex-wrap gap-1">
                  <a
                    className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300"
                    href="#"
                  >
                    Technology
                  </a>
                  <a
                    className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300"
                    href="#"
                  >
                    Fashion
                  </a>
                  <a
                    className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300"
                    href="#"
                  >
                    Architecture
                  </a>
                  <a
                    className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300"
                    href="#"
                  >
                    Fashion
                  </a>
                  <a
                    className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300"
                    href="#"
                  >
                    Food
                  </a>
                  <a
                    className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300"
                    href="#"
                  >
                    Technology
                  </a>
                  <a
                    className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300"
                    href="#"
                  >
                    Lifestyle
                  </a>
                  <a
                    className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300"
                    href="#"
                  >
                    Art
                  </a>
                  <a
                    className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300"
                    href="#"
                  >
                    Adventure
                  </a>
                  <a
                    className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300"
                    href="#"
                  >
                    Food
                  </a>
                  <a
                    className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300"
                    href="#"
                  >
                    Lifestyle
                  </a>
                  <a
                    className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300"
                    href="#"
                  >
                    Adventure
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
