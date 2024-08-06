import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    if (onLogout) {
      onLogout(); 
    }
    navigate('/login'); 
  };

  return (
    <nav className="fixed top-0 w-full bg-black shadow-md px-4 py-6 flex items-center justify-between z-50 h-20">
      <div className="flex items-center">
        <div className="mr-6">
          <h1 className='text-white font-bold text-2xl'>
            <Link to='/'>File-Secure</Link>
          </h1>
        </div>
      </div>
      <div className="flex flex-1 justify-center">
        <div className="flex">
          <Link to="/" className="text-white text-xl hover:text-gray-300 hover:text-2xl transition-all duration-200 border-r border-gray-500 px-4">Home</Link>
          <Link to="/FileUpload" className="text-white text-xl hover:text-gray-300 hover:text-2xl transition-all duration-200 px-4">Upload-Files</Link>
        </div>
      </div>
      <div>
        {isLoggedIn ? (
          <div className="flex items-center">
            <button onClick={handleLogout} className="ml-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center">
            <Link to="/login" className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
