import React from 'react'
import First from '../components/Home/First'
import Welcome from '../components/Home/Welcome'
import Causes from '../components/Home/Causes'
import Features from '../components/Home/Features'
import Events from '../components/Home/Events'
import Testimonial from '../components/Home/Testimonial'
import Logos from '../components/Home/Logos'
import Stat from '../components/Home/Stat'

const Home = () => {
  return (
    <>
      <First/>
      <Welcome/>
      <Causes/>
      <Features/>
      <Events/>
      <Testimonial/>
      <Logos/>
    </>
  )
}

export default Home