import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const EmailVerification = () => {
    const [message, setMessage] = useState('');
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = decodeURIComponent(queryParams.get('token'));

        if (token) {
            verifyEmail(token);
        } else {
            setMessage('No verification token provided.');
        }
    }, [location]);

    const verifyEmail = async (token) => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/verify-email', {
                params: { token }
            });
            console.log('Response from server:', response.data); // Log the response if needed
            setMessage('Email verified successfully! You can now log in.');
        } catch (error) {
            setMessage('Email verification failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 to-blue-400">
            <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-sm">
                <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Email Verification</h2>
                <p className="text-center text-lg text-gray-700 mb-4">{message}</p>
                <div className="flex justify-center">
                    <a href="/login" className="mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition duration-200 shadow-md">
                        Go to Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
