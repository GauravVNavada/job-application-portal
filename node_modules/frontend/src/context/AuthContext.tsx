'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '../services/api';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'RECRUITER' | 'APPLICANT';
}

interface AuthContextType {
    user: User | null;
    login: (token: string, userData: User) => void;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        const userData = Cookies.get('user');

        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (e) {
                Cookies.remove('token');
                Cookies.remove('user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = (token: string, userData: User) => {
        Cookies.set('token', token, { expires: 1 });
        Cookies.set('user', JSON.stringify(userData), { expires: 1 });
        setUser(userData);

        // Redirect based on role
        if (userData.role === 'ADMIN') router.push('/admin');
        else if (userData.role === 'RECRUITER') router.push('/recruiter');
        else router.push('/applicant');
    };

    const logout = () => {
        Cookies.remove('token');
        Cookies.remove('user');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
