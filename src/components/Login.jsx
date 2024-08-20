import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(`http://localhost:3000/user`, data);
      console.log(response);
      login(data);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <div className='card p-5'>
        <h1 className='text-center'>Are you registered?</h1>
        <h3 className='text-center text-danger'>Register to access</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label htmlFor="username" className='form-label'>Username</label>
            <input type="text" className='form-control' placeholder='Username' id='username' {...register('username', { required: true })} />
            {errors.username && <span className="text-danger">Username is required</span>}
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='form-label'>Password</label>
            <input type="password" className='form-control' placeholder='Password' id='password' {...register('password', { required: true })} />
            {errors.password && <span className="text-danger">Password is required</span>}
          </div>
          <div className='text-center'>
            <button className='btn btn-outline-success w-50' type='submit' disabled={Object.keys(errors).length !== 0}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
