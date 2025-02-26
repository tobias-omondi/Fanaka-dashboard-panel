import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    // const getCsrfToken = () => {
    //     const cookieValue = document.cookie
    //         .split('; ')
    //         .find(row => row.startsWith('csrftoken='))
    //         ?.split('=')[1];
    //     return cookieValue;
    // };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!userData.username || !userData.password) {
            setError('Please fill in all fields');
            return;
        }

        // API call to authenticate user
        try {
            const response = await fetch("http://127.0.0.1:8000/access-panel/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'X-CSRFToken': getCsrfToken(),
                },
                body: JSON.stringify({
                    username: userData.username,
                    password: userData.password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                navigate('/dashboard'); // Redirect to dashboard on successful login
            } else {
                // Handle backend-specific errors
                setError(data.message || 'Invalid username or password');
            }
        } catch (err) {
            // Handle network errors
            setError('An error occurred. Please try again.');
            console.error('Network error:', err);
        }
    };

    return (
        <div>
            <div className='bg-white flex flex-col justify-center items-center w-80 md:xl mx-auto shadow-lg rounded-4xl p-10'>
                <h2 className='text-gray-500 font-bold text-center'>Admin Login</h2>
                <div className='flex flex-col'>
                    <form className='flex flex-col gap-2' onSubmit={handleSubmit}>

                        <label className='text-gray-600'>Username:</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={userData.username}
                            required
                            className="bg-white border border-gray-900 p-1.5 text-sm rounded block focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            onChange={handleChange}
                        />

                        <label className='text-gray-600'>Password:</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={userData.password}
                            required
                            placeholder='Enter Your Password'
                            className="bg-white border border-gray-900 p-1.5 text-sm rounded block focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            onChange={handleChange}
                        />

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className='justify-center items-center flex mx-auto '>
                            <button
                                type='submit'
                                className='bg-orange-500 px-5 py-1 shadow rounded cursor-pointer text-white'
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;