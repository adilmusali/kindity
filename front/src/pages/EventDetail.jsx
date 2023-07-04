import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VscCalendar } from "react-icons/vsc";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { CiLocationArrow1 } from "react-icons/ci";
import DetailRouting from '../components/Event/DetailRouting';
import { Helmet } from 'react-helmet';

const EventDetail = () => {
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
    <section>
        <DetailRouting />
        <div className="container">
        <Helmet>
        <meta charSet="utf-8" />
        <title>Event Detail</title>
        </Helmet>
            <div className='flex flex-col gap-[30px] md:w-[650px] lg:w-[700px] xl:w-[700x] mx-auto py-[120px]'>
                <div><img className='mx-auto w-full' src={data.img} alt="" /></div>
                <div className='flex flex-col gap-5 lg:gap-0 lg:flex-row lg:justify-between'>
                    <ul className='text-[14px] text-[#777777] font-light'>
                        <li className='pb-[10px]'><a href="#" className='flex items-center gap-2'><VscCalendar />Saturday, 5th may,</a></li>
                        <li className='pb-[10px]'><a href="#" className='flex items-center gap-2'><TbBuildingSkyscraper />Rocky beach church</a></li>
                        <li className='pb-[10px]'><a href="#" className='flex items-center gap-2'><CiLocationArrow1 />Los Angeles, USA</a></li>
                    </ul>
                    <div className='flex flex-col gap-3 w-full lg:w-[400px]'>
                        <h3 className='text-[24px] font-semibold'>{data.header}</h3>
                        <p className='text-[14px] font-light text-[#777777] leading-6'>{data.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EventDetail