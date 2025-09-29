import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Checking Stripe status:', { stripe, elements, amount });

    if (!stripe || !elements || !amount) {
      return;
    }

    setIsProcessing(true);

    const { data: { clientSecret } } = await axios.post(
      'http://localhost:3000/kindity/payment/create-payment-intent',
      { amount: Number(amount) },
    )

    const cardElement = elements.getElement(CardElement);
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: name,
          email: email,
        },
      },
    });

    if (paymentResult.error) {
      toast.error(paymentResult.error.message);
      setIsProcessing(false);
    } else {
      if (paymentResult.paymentIntent.status === 'succeeded') {
        toast.success('Donation successful! Thank you for your generosity.');
        setAmount('');
        setName('');
        setEmail('');
        cardElement.clear();
      }
      setIsProcessing(false);
    }
  }

  return (
    <section>
      <div className='container'>
        <div className='py-[120px]'>
          <div className='flex justify-center'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-[15px] justify-center w-full xl:w-[560px]'>
              <h3 className='text-2xl font-semibold mb-4 text-center'>Make a Secure Donation</h3>
              <input 
                className='border text-[13px] px-[20px] py-[10px] focus:outline-none focus:ring transition duration-100 w-full'
                type="text" 
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required  
              />
              <input
                className="border text-[13px] px-[20px] py-[10px] focus:outline-none focus:ring transition duration-100"
                type="number"
                placeholder="Donation amount (USD)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <div className='border p-[10px]'>
                <CardElement options={{ style: { base: { fontSize: '14px' } } }} />
              </div>
              <div className='flex flex-row-reverse'>
                <button 
                  type='submit' 
                  disabled={!stripe || isProcessing}
                  className='text-[14px] uppercase font-semibold px-[30px] py-3 border border-[#ea2c58] bg-[#ea2c58] disabled:bg-red-300 hover:bg-transparent text-white hover:text-[#ea2c58] transition duration-500'
                  >
                    {isProcessing ? 'Processing...' : `Donate $${amount || '0'}`}
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DonationForm;