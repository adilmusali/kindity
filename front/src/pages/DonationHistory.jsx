import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const DonationHistory = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/donations`);
        setDonations(data);
      } catch (error) {
        console.error("Failed to fetch donation history", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return (
    <div className="container py-[120px]">
      <Helmet>
        <title>Donation History</title>
      </Helmet>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center">My Donation History</h1>
        {loading ? (
          <p className="text-center">Loading history...</p>
        ) : donations.length === 0 ? (
          <p className="text-center text-gray-500">You have not made any donations yet.</p>
        ) : (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-6">Date</th>
                  <th scope="col" className="py-3 px-6">Amount</th>
                  <th scope="col" className="py-3 px-6">Payment ID</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr key={donation._id} className="bg-white border-b">
                    <td className="py-4 px-6 font-medium text-gray-900">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      ${donation.amount.toFixed(2)} {donation.currency.toUpperCase()}
                    </td>
                    <td className="py-4 px-6 text-xs">{donation.stripePaymentId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationHistory;