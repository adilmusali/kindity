import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsPlusCircleFill } from "react-icons/bs";
import { UserContext } from "../../../context/userContext";

const TopicEvents = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortAsc, setSortAsc] = useState(true)
  const { user } = useContext(UserContext);

  const getData = async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
    setData(res.data);
  };

  const deleteData = async(id) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/events/${id}`)
    await getData()
  }

  const checkData = (e) => {
    setValue(e.target.value);
  };

  const toggle = () => {
    setSortAsc((prevSortAsc) => !prevSortAsc)
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <section>
      <div className="container">
        <div className="py-[120px]">
          <div className="flex justify-center items-center sm:justify-between pb-[60px] flex-wrap gap-5">
            <input
              className="border border-[#777777] px-4 py-2 rounded-[20px] text-[12px] sm:text-base focus:outline-none focus:ring"
              type="text"
              value={value}
              onChange={checkData}
              placeholder="Search Events..."
            />
            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
              {user && user.role === 'admin' && (
                <Link to={"/addEvent"}><BsPlusCircleFill className="text-[30px] sm:text-[40px] text-lime-500"/></Link>
              )}
            <button
              className="px-[50px] py-2 text-white bg-[#ea2c58] text-[12px] sm:text-base
              hover:bg-white hover:text-slate-500 border border-[#ea2c58] transition duration-500 rounded-[20px]"
              onClick={toggle}
            >
              Sort By Name
            </button>
            </div>
          </div>
          <div className="flex justify-center gap-[30px] lg:justify-between flex-wrap">
            {data
              .filter((item) =>
              item.header.toLowerCase().includes(value.toLowerCase())
              )
              .sort((a, b) => (sortAsc ? a.header.localeCompare(b.header) : b.header.localeCompare(a.header)))
              .map((d) => {
                return (
                  <div
                    key={d._id}
                    className="flex gap-[30px] w-full lg:w-[48%] flex-wrap sm:flex-nowrap items-center"
                  >
                    <img
                      className="w-full sm:w-[260px] sm:h-[220px] sm:w-none"
                      src={d.img}
                      alt=""
                    />
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center gap-2">
                      <a
                        href="#"
                        className="text-[12px] lg:text-[10px] xl:text-[12px] text-[#777777] hover:text-[#ea2c58] transition duration-500 font-light"
                      >
                        25th February, 2017
                      </a>
                      {user && user.role === 'admin' && (
                        <button onClick={() => deleteData(d._id)} className="text-[16px] lg:text-[14px] xl:text-[16px] bg-red-500 text-white hover:bg-red-600 duration-300 px-3">Delete</button>
                      )}
                        </div>
                      <Link to={`${d._id}`}>
                        <h4 className="text-[18px] font-semibold hover:text-[#ea2c58] transition duration-500">
                          {d.header}
                        </h4>
                      </Link>
                      <p className="text-[14px] text-[#777777] font-light leading-6">
                        {d.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicEvents;
