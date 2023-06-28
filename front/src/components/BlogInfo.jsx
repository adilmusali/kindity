import React from 'react'
import {
    FaFacebookF,
    FaTwitter,
    FaGithub,
    FaBehance,
    FaEnvelope
  } from "react-icons/fa";
import { GoSearch } from "react-icons/go";

const BlogInfo = () => {
  return (
    <div className="w-full lg:w-[360px]">
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
                      <FaEnvelope className="absolute top-[11px] left-[15px] text-[#777777]"/>
                      <input className="w-full py-2 px-[40px] focus:outline-none border" type="email" placeholder="Enter email"/>
                      <button className="bg-[#ea2c58] text-white px-5 font-medium" type="submit">Subscribe</button>
                    </form>
                      <p className="text-[12px] text-[#777777] font-light text-center mt-[10px]">You can unsubscribe at any time</p>
                  </div>
                </div>
              </div>
              <div>
              <div className="h-[1px] bg-[#eeeeee] w-full mt-[30px]"></div>
              <h4 className="text-[18px] bg-[#ea2c58] text-white text-center py-2 font-semibold mt-[30px]">
                    Tag Clouds
              </h4>
              <div className="text-[12px] mt-[30px] font-light flex flex-wrap gap-1">             
                  <a className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300" href="#">Technology</a>
                  <a className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300" href="#">Fashion</a>
                  <a className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300" href="#">Architecture</a>
                  <a className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300" href="#">Fashion</a>
                  <a className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300" href="#">Food</a>
                  <a className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300" href="#">Technology</a>
                  <a className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300" href="#">Lifestyle</a>
                  <a className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300" href="#">Art</a>
                  <a className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300" href="#">Adventure</a>
                  <a className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300" href="#">Food</a>
                  <a className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300" href="#">Lifestyle</a>
                  <a className="bg-white px-3 py-1 border hover:border-[#ea2c58] hover:bg-[#ea2c58] hover:text-white duration-300" href="#">Adventure</a>
              </div>
              </div>
            </div>
          </div>
  )
}

export default BlogInfo