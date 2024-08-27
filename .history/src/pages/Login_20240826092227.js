import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; 

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loginError, setLoginError] = useState(null);

    const onSubmit = async (data) => {
        try {
            setLoginError(null);
            
            const response = await axios.post('https://api.realworld.io/api/users/login', {
                user: {
                    email: data.email,
                    password: data.password
                }
            });

            const user = response.data.user;
            const token = user.token;

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);

            window.location.href = '/';
        } catch (error) {
            setLoginError('Invalid email or password. Please try again.');
            console.error('Login error:', error.response?.data?.errors);
        }
    };

    return (
        <div className='login-container'>
            
            {loginError && (
                <div className="error-popup">
                    <p>{loginError}</p>
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className='login-form'>
                <h2>Sign In</h2>
                <label>Email address</label>
                <input 
                    type='email' 
                    placeholder='Email address' 
                    {...register('email', { required: 'Email is required' })} 
                />
                {errors.email && <p className='error'>{errors.email.message}</p>}

                <label>Password</label>
                <input 
                    type='password' 
                    placeholder='Password' 
                    {...register('password', { required: 'Password is required' })}
                />
                {errors.password && <p className='error'>{errors.password.message}</p>}
                
                <button type='submit' className='btn btn-primary'>Login</button>
                <p className='sign-up-link'>Don&apos;t have an account? <Link to='/sign-up'>Sign Up.</Link></p>
            </form>
            
        </div>
    );
};

export default Login;