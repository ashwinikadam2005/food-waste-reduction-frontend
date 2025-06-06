import React, { useState } from "react";
import axios from "axios";
import '../styles/GenerateReport.css';

const GenerateReport = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [category, setCategory] = useState('both');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // For loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setLoading(true); // Start loading

    // Date validation: From date should be before To date
    if (new Date(fromDate) > new Date(toDate)) {
      setError("From Date cannot be later than To Date.");
      setLoading(false); // Stop loading on error
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/analytics/custom-report", {
        fromDate,
        toDate,
        category,
      }, { responseType: 'blob' }); // Set response type to blob for CSV download

      if (res.status === 200) {
        // Call the function to download CSV after receiving the data
        downloadCSV(res.data);
      } else {
        setError('No data available for the selected date range and category.');
      }
    } catch (error) {
      console.error("Error fetching custom report:", error);
      setError('Error generating report. Please try again later.');
    } finally {
      setLoading(false); // Stop loading after request
    }
  };

  const downloadCSV = (data) => {
    const fileName = `custom_report_from_${fromDate}_to_${toDate}.csv`;
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName); // Dynamic file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="generate-report-container">
      <h2>Generate Custom Analytics Report</h2>
      <form className="report-form" onSubmit={handleSubmit}>
        <label>
          From Date:
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} required />
        </label>
        <label>
          To Date:
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} required />
        </label>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="veg">Veg</option>
            <option value="nonveg">Non-Veg</option>
            <option value="both">Both</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Generating Report...' : 'Generate Report'}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default GenerateReport;
