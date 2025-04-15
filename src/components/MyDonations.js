import React, { useEffect, useState } from "react";
import axios from "axios";

const MyDonations = () => {
  const [donations, setDonations] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/my-donations", {
          withCredentials: true,
        });

        if (response.data && response.data.length > 0) {
          setDonations(response.data);
        } else {
          setError("You haven't made any donations yet.");
        }
      } catch (err) {
        if (err.response?.status === 403) {
          setError("Access denied. You must be a donor to view donations.");
        } else {
          setError("Failed to fetch donations. Please try again.");
        }
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Donations</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 mb-4 rounded">
          {error}
        </div>
      )}

      {donations.length > 0 ? (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Food Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Food Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Preparation Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Storage Instructions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((donation) => (
                <tr key={donation.id}>
                  <td className="px-6 py-4 text-sm text-gray-500">{donation.food_category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{donation.food_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{donation.quantity}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(donation.expiry_date)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(donation.preparation_date)}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{donation.storage_instructions || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{formatDate(donation.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !error && (
          <div className="bg-blue-100 border border-blue-400 text-blue-700 p-4 rounded">
            You haven't made any donations yet.
          </div>
        )
      )}
    </div>
  );
};

export default MyDonations;
