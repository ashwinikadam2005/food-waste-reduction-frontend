import './App.css';
import Navbar from './components/Navbar';
import AdminLogin from './components/AdminLogin';
import { Navigate, Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import Login from './components/Login';
import ManageUsers from './components/ManageUsers';
import Home from './components/Home';
import ContactUs from './components/Contact';
import FoodDonate from './components/FoodDonate';
import DonationRequestList from './components/DonationRequestList';
import DonarRegisteration from './components/DonarRegisteration';
import { useEffect } from "react";
import axios from "axios";
import OtpVerification from './components/OtpVerification';
import MyDonations from './components/MyDonations';
import ReceiverHistory from './components/ReceiverHistory';
import AcceptedDonations from './components/AcceptedDonations';
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';  // Import PrivateRoute
import GenerateReport from './components/GenerateReport';
import FeedbackForm from './components/FeedbackForm';
import SeeFeedbacks from './components/SeeFeedback.js';

function App() {
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const res = await axios.get("http://localhost:5001/csrf-token", {
        withCredentials: true,
      });
      axios.defaults.headers.post["X-CSRF-Token"] = res.data.csrfToken;
    };
    fetchCsrfToken();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Default to Home Page */}

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/donar-registeration" element={<DonarRegisteration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Protect admin routes with PrivateRoute, allowing only 'admin' */}
        <Route
          path="/admin-dashboard"
          element={<PrivateRoute element={<AdminDashboard />} allowedRoles={['admin']} />}
        />
        <Route
          path="/generate-report"
          element={<PrivateRoute element={<GenerateReport />} allowedRoles={['admin']} />}
        />
        <Route
          path="/see-feedbacks"
          element={<PrivateRoute element={<SeeFeedbacks />} allowedRoles={['admin']} />}
        />


        <Route
          path="/manage-users"
          element={<PrivateRoute element={<ManageUsers />} allowedRoles={['admin']} />}
        />
        <Route path="/food-donate" element={<PrivateRoute element={<FoodDonate />} allowedRoles={['donor']} />} />

        <Route path="/donation-request-list" element={<DonationRequestList />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/my-donations" element={<MyDonations />} />
        <Route path="/receiver-history" element={<ReceiverHistory />} />
        <Route path="/accepted-donations" element={<AcceptedDonations />} />
        <Route path="/feedback-form" element={<FeedbackForm />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
