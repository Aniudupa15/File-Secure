import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
const inputClasses =
  "w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500";
const buttonClasses = "w-full py-2 rounded-lg hover:bg-blue-600 mb-4";
const socialButtonClasses =
  "w-full py-2 rounded-lg hover:bg-zinc-200 flex items-center justify-center mb-4";

const Login = () => {
  const [email, setName] = useState();
    const [password, setPass] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post( 'http://localhost:3001/login', {email, password})
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                console.log("Login Success");
                alert('Login successful!')
                navigate('/');
            }
            else{
                alert('Incorrect password! Please try again.');
            }
        })
        .catch(err => console.log(err));
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <img src="https://placehold.co/100x50?text=Logo" alt="DocEasy Logo" />
        </div>
        <h2 className="text-center text-2xl font-semibold mb-4">
          Hello There! Welcome back
        </h2>
        <form onSubmit={handleSubmit}>
        <label className="block text-zinc-700 mb-2" htmlFor="username">
          Username or email
        </label>
        <input
          id="username"
          type="text"
          className={inputClasses}
          placeholder="Enter your username or email"
          onChange={(e)=>setName(e.target.value)}
        />
        <label className="block text-zinc-700 mb-2" htmlFor="username">
          Password
        </label>
        <input
          id="password"
          type="text"
          className={inputClasses}
          placeholder="Password"
          onChange={(e)=>setPass(e.target.value)}
        />
        <button className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300">
          Continue
        </button>
        <div className="flex items-center justify-center mb-4">
          <span className="text-zinc-500">Or</span>
        </div>
        </form>
        <div className="text-center">
          <span className="text-zinc-500">
            No account?{" "}
            <Link to="/Register" className="text-blue-700 font-bold">
              Create One
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
