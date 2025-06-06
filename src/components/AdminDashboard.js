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
  Label,
} from "recharts";
import '../styles/AdminDashboard.css'; // Ensure path is correct
import { useNavigate } from "react-router-dom";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [categoryData, setCategoryData] = useState([]);
  const [quantityData, setQuantityData] = useState([]);
  const [statusData, setStatusData] = useState([]);
  const [topDonors, setTopDonors] = useState([]);
  const [quantityBreakdownData, setQuantityBreakdownData] = useState([]); // NEW STATE
  const navigate = useNavigate();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, categoryRes, quantityRes, statusRes, topDonorsRes, quantityBreakdownRes] = await Promise.all([
          axios.get("http://localhost:5001/analytics/statistics-summary"),
          axios.get("http://localhost:5001/analytics/category-wise-donations"),
          axios.get("http://localhost:5001/analytics/quantity-over-time"),
          axios.get("http://localhost:5001/analytics/status-comparison"),
          axios.get("http://localhost:5001/analytics/top-donors"),
          axios.get("http://localhost:5001/analytics/quantity-breakdown-over-time"), // NEW API

        ]);

        setSummary(summaryRes.data);
        setCategoryData(categoryRes.data);
        setQuantityData(quantityRes.data);
        setStatusData(statusRes.data);
        setTopDonors(topDonorsRes.data);
        setQuantityBreakdownData(quantityBreakdownRes.data); // NEW DATA

      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">Food Donation Dashboard</h1>
      <div className="dashboard-container">
      <div style={{ textAlign: "right", marginBottom: "10px" }}>
        <button className="generate-report-btn" onClick={() => navigate("/generate-report")}>
          📊 Generate Custom Report
        </button>
      </div>
      {/* ... rest of dashboard */}
    </div>

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
        <div className="card summary-card">
          <h2>Completed</h2>
          <p>{summary.completed || 0}</p>
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
    <BarChart data={quantityBreakdownData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()}>
        <Label value="Date" offset={-5} position="insideBottom" />
      </XAxis>
      <YAxis 
        domain={[0, 'auto']} // Automatically scales the Y-axis
        allowDataOverflow={true} // Prevent labels from being clipped
      >
        <Label value="Quantity Donated (kg / plates)" angle={-90} position="insideleft" />
      </YAxis>
      <Tooltip />
      <Bar dataKey="total_kg" fill="#82ca9d" name="Kg" />
      <Bar dataKey="total_plates" fill="#8884d8" name="Plates" />
    </BarChart>
  </ResponsiveContainer>
</div>
        <div className="card">
          <h3>Accepted vs Pending Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
  <LineChart data={statusData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()}>
      <Label value="Date" offset={-5} position="insideBottom" />
    </XAxis>
    <YAxis 
      domain={[0, 'dataMax']} // Dynamically scale Y-axis to the max data value
      tickFormatter={(tick) => Math.floor(tick)} // Ensure ticks are whole numbers
    >
      <Label value="Number of Donations" angle={-90} position="insideleft" />
    </YAxis>
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="accepted" stroke="#4CAF50" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
    <Line type="monotone" dataKey="pending" stroke="#FF9800" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
    <Line type="monotone" dataKey="completed" stroke="#FF0000" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
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
        <th>Total Donated (plates)</th>
      </tr>
    </thead>
    <tbody>
      {topDonors.length > 0 ? (
        topDonors.map((donor, index) => (
          <tr key={index}>
            <td>{donor.organization_name}</td>
            <td>{donor.total_kg}</td>
            <td>{donor.total_plates}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="3">No donors data available.</td>
        </tr>
      )}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default Dashboard;
