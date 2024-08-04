import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Register from './pages/Register';
import Login from './pages/Login';
import FileUpload from './pages/FileUpload';
import Footer from './components/Footer';
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <Router>
      <div>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Register" element={<Register/>}></Route>
          <Route path="/Login" element={<Login onLogin={handleLogin}/>}></Route>
          <Route path="/FileUpload" element={<FileUpload/>}></Route>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}