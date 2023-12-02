import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/HomePage';
import { Auth } from './components/auth';
import  AdminLogin from './components/AdminLogin';
import About from "./components/About";
import UserLogin from "./components/UserLogin";
import CoachLogin from "./components/CoachLogin";
import { firestore } from "./firebase-config";
import {useState} from "react";
function App() {

  // Your other functions and logic go here
    const [userInfo,setUserInfo] = useState([]);
    const getUserInfo = () => {

    }

  return (

        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/UserLogin" element={< UserLogin />} />
            <Route path="/CoachLogin" element={< CoachLogin />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            <Route path="/About" element={< About />} />

            {/* Other routes go here */}
          </Routes>
        </div>

  );
}

export default App;