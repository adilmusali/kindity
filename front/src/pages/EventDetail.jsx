import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { VscCalendar } from "react-icons/vsc";
import DetailRouting from '../components/Event/DetailRouting';
import { Helmet } from 'react-helmet';
import { formatEventDate } from '../utils/contentFormatters';
import DemoLabel from '../components/DemoLabel';

const EventDetail = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const params = useParams();
  
    useEffect(() => {
      let active = true;
      setData(null);
      setError(false);
      axios.get(`${import.meta.env.VITE_API_URL}/api/events/${params.id}`)
        .then(({ data: event }) => { if (active) setData(event); })
        .catch(() => { if (active) setError(true); });
      return () => { active = false; };
    }, [params.id]);

    if (error) {
      return <div className="text-center py-40">This event is unavailable. <Link className="text-[#ea2c58] hover:underline" to="/event">Browse events</Link></div>;
    }

    if (!data) {
      return <div>Loading...</div>;
    }  

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
                        <li className='pb-[10px] flex items-center gap-2'><VscCalendar />{formatEventDate(data.eventDate)}</li>
                    </ul>
                    <div className='flex flex-col gap-3 w-full lg:w-[400px]'>
                        <h3 className='text-[24px] font-semibold'>{data.header}</h3>
                        <p className='text-[14px] font-light text-[#777777] leading-6'>{data.desc}</p>
                        {data.isDemo === true && <DemoLabel />}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EventDetail
