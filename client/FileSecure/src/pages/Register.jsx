import React, { useState } from 'react';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const inputClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary';

const RegisterForm = () => {
  const [Name ,setName]=useState()
  const [PhoneNo ,setPhone]=useState()
  const [Password ,setPass]=useState()
  const [ConfirmPassword ,setCPass]=useState()

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoneChange = (phone) => {
    setFormData({
      ...formData,
      phone
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/register/', {Name,PhoneNo,Password,ConfirmPassword})
      .then(response => {
        console.log(response.data);
        navigate('/upload'); // Redirect to the upload page
      })
      .catch(error => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400 mt-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="https://placehold.co/100x50?text=Logo" alt="DocEasy Logo" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
        <p className="text-center text-muted-foreground mb-6">Get started today!</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
            <input 
              className={inputClasses} 
              type="text" 
              id="username" 
              name="username" 
              placeholder="Username" 
              value={formData.username}
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="phone">Mobile Number</label>
            <PhoneInput
              country={"in"}
              value={formData.phone}
              onChange={(e)=>setPhone(e.target.value)}
              inputClass={inputClasses}
              containerClass="phone-input-container"
              inputStyle={{ width: '100%' }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input 
              className={inputClasses} 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Password" 
              value={formData.password}
              onChange={(e)=>setPass(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">Confirm Password</label>
            <input 
              className={inputClasses} 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Confirm Password" 
              value={formData.confirmPassword}
              onChange={(e)=>setCPass(e.target.value)}
            />
          </div>
          <button 
            className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
            type="submit"
          >
            Create your account
          </button>
        </form>
        <div className="text-center pt-3">
          <div>
            <span className="text-zinc-500 pb-2">Or</span>
          </div>
          <span className="text-zinc-500">Have an account? <Link to="/login" className='text-blue-700 font-bold'>Login</Link></span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
