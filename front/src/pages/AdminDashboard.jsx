import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const AdminDashboard = () => {
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllDonations = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/api/admin/donations");
        setAllDonations(data);
      } catch (error) {
        console.error("Failed to fetch all donations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllDonations();
  }, []);

  return (
    <div className="container py-[120px]">
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center">All Donations</h1>
        {loading ? (
          <p className="text-center">Loading all donations...</p>
        ) : allDonations.length === 0 ? (
          <p className="text-center text-gray-500">There are no donations to display.</p>
        ) : (
          <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="py-3 px-6">Date</th>
                  <th scope="col" className="py-3 px-6">Donor Name</th>
                  <th scope="col" className="py-3 px-6">Donor Email</th>
                  <th scope="col" className="py-3 px-6">Amount</th>
                </tr>
              </thead>
              <tbody>
                {allDonations.map((donation) => (
                  <tr key={donation._id} className="bg-white border-b hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-gray-900">{new Date(donation.createdAt).toLocaleString()}</td>
                    <td className="py-4 px-6">{donation.user?.name || 'N/A'}</td>
                    <td className="py-4 px-6">{donation.user?.email || 'N/A'}</td>
                    <td className="py-4 px-6">${donation.amount.toFixed(2)} {donation.currency.toUpperCase()}</td>
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

export default AdminDashboard;