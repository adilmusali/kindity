import React, { useState, useEffect } from 'react'
import axios from 'axios';
import First from '../components/Home/First'
import Welcome from '../components/Home/Welcome'
import Causes from '../components/Home/Causes'
import Features from '../components/Home/Features'
import Events from '../components/Home/Events'
import Testimonial from '../components/Home/Testimonial'
import Logos from '../components/Home/Logos'
import {Helmet} from "react-helmet";

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/home-content");
        setHomeData(data);
      } catch {
        console.error("Failed to fetch home page data", error);
      } finally {
        setLoading(false)
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
      </Helmet>
      <First/>
      <Welcome 
      welcomeData={homeData.welcome}
      statData={homeData.statistics}
      />
      <Causes data={homeData.causes}/>
      <Features data={homeData.features}/>
      <Events data={homeData.events}/>
      <Testimonial data={homeData.testimonial}/>
      <Logos data={homeData.logo}/>
    </>
  )
}

export default Home