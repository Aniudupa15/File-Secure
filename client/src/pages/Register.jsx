import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const inputClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary';

const RegisterForm = ()  => {
  const [Name, setName] = useState('');
  const [Password, setPass] = useState('');
  const [CPassword, setCPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Ensure passwords match before sending the request
    if (Password !== CPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    // Define the data object to be sent to the server
    const data = {
      email: Name,
      password: Password,
      CPass: CPassword, // Assuming the username is also the email
    };

    axios.post('https://file-secure.onrender.com/register', data)
      .then(result => {
        console.log(result);
        if (result.data === "Already registered") {
          alert("E-mail already registered! Please Login to proceed.");
          navigate('/login');
        } else {
          alert("Registered successfully! Please Login to proceed.");
          navigate('/login');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400 mt-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <div className="flex justify-center mb-1">
          <img src="./src/Images/logo.jpg" className="w-24 h-24 rounded-full" alt="DocEasy Logo" />
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
              onChange={(e) => setName(e.target.value)}
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
              onChange={(e) => setPass(e.target.value)}
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
              onChange={(e) => setCPass(e.target.value)}
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
