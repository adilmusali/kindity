import React from 'react'
import AboutUs from '../components/About/AboutUs'
import Features from '../components/Home/Features'
import Welcome from '../components/About/Welcome'
import Testimonial from '../components/Home/Testimonial'
import Logos from '../components/Home/Logos'
import { Helmet } from 'react-helmet'

const About = () => {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>About</title>
    </Helmet>
    <AboutUs />
    <Welcome />
    <Features />
    <Testimonial />
    <Logos />
    </>
  )
}

export default About