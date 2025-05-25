import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    authToken: string | null;
    userId: number | null;
    login: (token: string, userId: number) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('auth_token');
        const storedUserId = localStorage.getItem('user_id');

        if (storedToken) setAuthToken(storedToken);
        if (storedUserId) setUserId(Number(storedUserId));
    }, []);

    const login = (token: string, userId: number) => {
        setAuthToken(token);
        setUserId(userId);
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user_id', userId.toString());
    };

    const logout = () => {
        setAuthToken(null);
        setUserId(null);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_id');
    };

    return (
        <AuthContext.Provider value={{ authToken, userId, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
