import api from './api';

export interface Job {
    id: string;
    title: string;
    description: string;
    recruiter_id: string;
    status: 'OPEN' | 'CLOSED';
    created_at: string;
    recruiter?: {
        name: string;
        email: string;
    };
}

export interface Application {
    id: string;
    job_id: string;
    applicant_id: string;
    status: 'PENDING' | 'SHORTLISTED' | 'REJECTED' | 'ACCEPTED';
    applied_at: string;
    job?: Job;
    applicant?: {
        name: string;
        email: string;
    };
}

export const jobService = {
    getJobs: async () => {
        const response = await api.get<Job[]>('/jobs');
        return response.data;
    },

    createJob: async (data: { title: string; description: string }) => {
        const response = await api.post<Job>('/jobs', data);
        return response.data;
    },

    getJobById: async (id: string) => {
        const response = await api.get<Job>(`/jobs/${id}`);
        return response.data;
    },

    closeJob: async (id: string) => {
        const response = await api.patch<Job>(`/jobs/${id}/close`);
        return response.data;
    }
};

export const applicationService = {
    apply: async (jobId: string) => {
        const response = await api.post<Application>('/applications/apply', { jobId });
        return response.data;
    },

    getMyApplications: async () => {
        const response = await api.get<Application[]>('/applications/my-applications');
        return response.data;
    },

    getJobApplications: async (jobId: string) => {
        const response = await api.get<Application[]>(`/applications/job/${jobId}`);
        return response.data;
    },

    updateStatus: async (id: string, status: Application['status']) => {
        const response = await api.patch<Application>(`/applications/${id}/status`, { status });
        return response.data;
    }
};
