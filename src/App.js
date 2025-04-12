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
      <Route path="/" element={<Home />} /> Default to Home Page

        <Route path="/admin-login" element={<AdminLogin />} />
        {/* Add other routes here */}
        <Route path="/about-us" element={<AboutUs/>}/>
        <Route path="/donar-registeration" element={<DonarRegisteration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/contact" element={<ContactUs/>}/>
        <Route path="/food-donate" element={<FoodDonate/>}/>

        <Route path="/manage-users" element={<ManageUsers/>}/>
        <Route path="/donation-request-list" element={<DonationRequestList/>}/>
        <Route path="/otp-verification" element={<OtpVerification/>} />
        <Route path="/my-donations" element={<MyDonations/>} />

        <Route path="*" element={<Navigate to="/" replace />} />
        


      </Routes>
    </>
  );
}

export default App;
