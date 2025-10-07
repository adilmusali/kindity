import React, { useState, useEffect } from 'react'
import axios from 'axios';
import AboutUs from '../components/About/AboutUs'
import Features from '../components/Home/Features'
import Welcome from '../components/About/Welcome'
import Testimonial from '../components/Home/Testimonial'
import Logos from '../components/Home/Logos'
import { Helmet } from 'react-helmet'

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try{
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/about`);
        setAboutData(data);
      } catch (error) {
        console.error("Failed to fetch about page data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading || !aboutData) {
    return <div className='text-center py-40'>Loading...</div>
  }

  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>About</title>
    </Helmet>
    <AboutUs />
    <Welcome data={aboutData.welcome}/>
    <Features data={aboutData.features}/>
    <Testimonial data={aboutData.testimonial}/>
    <Logos data={aboutData.logo}/>
    </>
  )
}

export default About