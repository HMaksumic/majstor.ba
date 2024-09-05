import React, { createContext, useState } from 'react';
import axios from 'axios';
['log', 'warn', 'error', 'info'].forEach(method => console[method] = () => {});

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

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
            if (data.success) {
                console.log('Login successful, setting token');
                localStorage.setItem('user', JSON.stringify({ ...data.user, token: data.access_token }));
                setUser({ ...data.user, token: data.access_token });
                return { success: true };
            } else {
                console.log('Login failed:', data.message);
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error('Login error from server:', error);
            throw error;
        }
    };
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;