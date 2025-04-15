import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import '../styles/AdminDashboard.css'; // Ensure path is correct

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [quantityData, setQuantityData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [topDonors, setTopDonors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, categoryRes, quantityRes, statusRes, topDonorsRes] = await Promise.all([
          axios.get("http://localhost:5001/analytics/statistics-summary"),
          axios.get("http://localhost:5001/analytics/category-wise-donations"),
          axios.get("http://localhost:5001/analytics/quantity-over-time"),
          axios.get("http://localhost:5001/analytics/status-comparison"),
          axios.get("http://localhost:5001/analytics/top-donors"),
        ]);

        setSummary(summaryRes.data);
        setCategoryData(categoryRes.data);
        setQuantityData(quantityRes.data);
        setStatusData(statusRes.data);
        setTopDonors(topDonorsRes.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Food Donation Dashboard</h1>

      <div className="summary-and-category">
        <div className="card summary-card">
          <h2>Total Donations</h2>
          <p>{summary.total || 0}</p>
        </div>
        <div className="card summary-card">
          <h2>Accepted</h2>
          <p>{summary.accepted || 0}</p>
        </div>
        <div className="card summary-card">
          <h2>Pending</h2>
          <p>{summary.pending || 0}</p>
        </div>

        <div className="card pie-chart-card">
          <h3>Donations by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="donations_count"
                nameKey="food_category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-container">
        <div className="card">
          <h3>Quantity Donated Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={quantityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total_quantity" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3>Accepted vs Pending Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={statusData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="accepted"
                stroke="#4CAF50"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="pending"
                stroke="#FF9800"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="table-container card">
        <h3>Top Donors</h3>
        <table>
          <thead>
            <tr>
              <th>Donor Name</th>
              <th>Total Donated (kg)</th>
            </tr>
          </thead>
          <tbody>
            {topDonors.length > 0 ? (
              topDonors.map((donor, index) => (
                <tr key={index}>
                  <td>{donor.organization_name}</td>
                  <td>{donor.total_donated}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No donors data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
