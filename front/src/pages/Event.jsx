import React from 'react'
import UpcomingEvents from '../components/Event/UpcomingEvents'
import TopicEvents from '../components/Event/TopicEvents'
import { Helmet } from 'react-helmet'

const Event = () => {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Events</title>
    </Helmet>
        <UpcomingEvents />
        <TopicEvents />
    </>
  )
}

export default Event