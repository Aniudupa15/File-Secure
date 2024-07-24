import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const inputClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary';

const RegisterForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-400 mt-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img src="https://placehold.co/100x50?text=Logo" alt="DocEasy Logo" />
        </div>
        <h2 className="text-2xl font-bold mb-2 text-center">Register</h2>
        <p className="text-center text-muted-foreground mb-6">Get started today!</p>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="first-name">First name</label>
            <input className={inputClasses} type="text" id="first-name" placeholder="First name" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="last-name">Last name</label>
            <input className={inputClasses} type="text" id="last-name" placeholder="Last name" />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1" htmlFor="username-email">Username or email</label>
            <input className={inputClasses} type="text" id="username-email" placeholder="Username or email" />
          </div>
          <button className="w-full bg-blue-800 text-white py-2 rounded-lg hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300" >Create your account</button>
        </form>
        <div className="text-center pt-3">
            <div>
                <span className="text-zinc-500 pb-2">Or</span>
            </div>
          <span className="text-zinc-500 ">No account? <Link to="/Login" className='text-blue-700 font-bold'>Create One</Link></span>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
