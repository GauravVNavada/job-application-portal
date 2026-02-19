import api from './api';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'ADMIN' | 'RECRUITER' | 'APPLICANT';
}

interface AuthResponse {
    token: string;
    user: User;
}

export const authService = {
    register: async (data: { name: string; email: string; password: string; role: string }) => {
        const response = await api.post<AuthResponse>('/auth/register', data);
        return response.data;
    },

    login: async (data: { email: string; password: string }) => {
        const response = await api.post<AuthResponse>('/auth/login', data);
        return response.data;
    }
};
