import React from 'react'
import ContactUs from '../components/Contact/ContactUs'
import SendMessage from '../components/Contact/SendMessage'
import { Helmet } from 'react-helmet'

const Contact = () => {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Contact</title>
    </Helmet>
      <ContactUs />
      <SendMessage />
    </>
  )
}

export default Contact