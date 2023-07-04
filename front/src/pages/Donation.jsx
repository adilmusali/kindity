import React from 'react'
import RoutingDonation from '../components/Donation/RoutingDonation'
import DonationForm from '../components/Donation/DonationForm'
import { Helmet } from 'react-helmet'

const Donation = () => {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Donation</title>
    </Helmet>
      <RoutingDonation />
      <DonationForm />
    </>
  )
}

export default Donation