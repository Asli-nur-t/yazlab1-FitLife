import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/HomePage';
import { Auth } from './components/auth';
import  AdminLogin from './components/AdminLogin';
function App() {

  // Your other functions and logic go here

  return (

        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/adminLogin" element={<AdminLogin />} />
            {/* Other routes go here */}
          </Routes>
        </div>

  );
}

export default App;