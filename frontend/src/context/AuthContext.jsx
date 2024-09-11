import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        console.log('Initial user state:', storedUser);
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const[access_token, setAccess_token] = useState(localStorage.getItem('access_token'));

    useEffect(() => {
        console.log('User state changed:', user);
    }, [user]);

    const register = async (name, email, password) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', {
                name,
                email,
                password
            });
            return response.data;
        } catch (error) {
            console.error('Register error from server:', error);
            throw error;
        }
    };
    
    const login = async (email, password) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            
            if (response.ok) {
                const userData = { ...data.user, access_token: data.access_token };
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
                console.log('User token:', user ? user.access_token : 'No user or token');
                return { success: true };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const createUserAd = async (adData, images) => {
        try {
            const formData = new FormData();
            Object.keys(adData).forEach(key => formData.append(key, adData[key]));
            images.forEach((image) => formData.append('images', image));
    
            // Log the access token for debugging
            console.log('User token:', user ? access_token : 'No user or token');
    
            if (!user || !access_token) {
                throw new Error('User is not authenticated or token is missing');
            }
    
            const response = await fetch('http://127.0.0.1:8000/api/create-ad/', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                },
                body: formData,  // Do not set Content-Type, fetch will automatically set it for FormData
            });
    
            const data = await response.json();
    
            if (response.su) {
                return { success: true, message: 'Ad created successfully' };
            } else {
                console.error('Error response:', data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Error creating ad:', error.message || error);
            return { success: false, message: 'An error occurred while creating the ad.' };
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, createUserAd}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;