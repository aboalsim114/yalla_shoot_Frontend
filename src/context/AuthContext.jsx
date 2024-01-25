import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const updateToken = (newToken) => {
        setToken(newToken);
    };

    const updateUserId = (newUserId) => {
        setUserId(newUserId);
    };

    return (
        <AuthContext.Provider value={{ token, updateToken, userId, updateUserId }}>
            {children}
        </AuthContext.Provider>
    );
};
