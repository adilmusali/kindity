import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import RoutingDonation from '../components/Donation/RoutingDonation'
import DonationForm from '../components/Donation/DonationForm'
import { Helmet } from 'react-helmet'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Donation = () => {
  return (
    <>
    <Helmet>
        <meta charSet="utf-8" />
        <title>Donation</title>
    </Helmet>
      <RoutingDonation />
      <Elements stripe={stripePromise}>
      <DonationForm />
      </Elements>
    </>
  )
}

export default Donation