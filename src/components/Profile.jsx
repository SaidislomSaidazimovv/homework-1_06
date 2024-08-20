import React from 'react'
import { useAuth } from './AuthProvider'
import { Link, useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const handleLogout = () => {
    const confirm = window.confirm('Are you sure you want to log out?');
    if (confirm) {

      logout();
      navigate("/login");
    } else {
      alert('nno')
    }

  };

  return (
    <div className="container border  rounded my-4 ">
      <Link className='btn ' to='/'>Back</Link>
      <div className="p-5 w-50 mx-auto ">
        <h1 className="pb-3 text-center text-danger">User info</h1>
        <h3 className="mb-3 text-warning">Username: {user && user.username}</h3>
        <h3 className="mb-5 text-warning">Password: {user && user.password}</h3>

        <button className="btn btn-outline-danger " onClick={handleLogout}>
          Logout
        </button>


      </div>
    </div>
  );
}

export default Profile