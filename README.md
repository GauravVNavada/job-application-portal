# Job Application Portal with RBAC

## 🚀 Project Overview

The **Job Application Portal** is a full-stack web application designed to streamline the recruitment process. It facilitates interaction between **Job Seekers** (Applicants) and **Recruiters**, managed by a robust **Role-Based Access Control (RBAC)** system.

This project was developed to fulfill and exceed the requirements of the Ellipsonic Internship assignment, providing a modern, responsive, and secure platform for job management.

### 🎯 Key Features (Internship Requirements Met)

*   **Role-Based Access Control (RBAC)**: Secure separation of duties between `Admin`, `Recruiter`, and `Applicant`.
*   **Job Management**: Recruiters can post, view, and close job openings `[Requsite: Job postings]`.
*   **Application System**: Applicants can view open jobs and submit applications `[Requisite: Application submission]`.
*   **Application Tracking**:
    *   Recruiters can view all applications for their jobs and update statuses (Pending -> Shortlisted -> Accepted/Rejected) `[Requisite: Manage applications and statuses]`.
    *   Applicants can track the real-time status of their applications `[Requisite: View application status]`.
*   **Validation**: Users can only apply for *open* positions, and duplicate applications are prevented.

### 🌟 Bonus Features Achieved
*   **Cloud Deployment**: Fully deployed on **Vercel** with a Cloud PostgreSQL database (**Neon**).
*   **Secure Authentication**: JWT-based stateless authentication with strict password hashing (Bcrypt).
*   **Admin Dashboard**: A powerful admin interface to manage all users and contents.
*   **Responsive UI**: Built with **Next.js 14**, **Tailwind CSS**, and **Geist UI** principles for a premium, mobile-friendly experience.
*   **Dynamic Admin Setup**: Automated database schema synchronization and admin promotion workflows.

### ✅ Mandatory Requirements Compliance

| Requirement | Implementation Status |
| :--- | :--- |
| **Frontend: Next.js** | **Yes** (App Router used) |
| **Backend: Node.js** | **Yes** (Express + Node.js) |
| **Database: PostgreSQL** | **Yes** (Hosted on Neon) |
| **RBAC Implementation** | **Yes** (3 Roles: Admin, Recruiter, Applicant) |
| **Git Repository** | **Yes** (Structured commits & version control) |

---

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14** (App Router) | React-based framework for server-side rendering and static generation. |
| **Styling** | **Tailwind CSS** | Utility-first CSS framework for rapid, responsive design. |
| **Backend** | **Node.js** + **Express** | Robust runtime environment for RESTful API services. |
| **Database** | **PostgreSQL** (Neon Cloud) | Relational database management system. |
| **ORM** | **Prisma** | Modern ORM for type-safe database queries. |
| **Auth** | **JWT** + **Bcrypt** | Secure token-based authentication and password security. |
| **Deployment** | **Vercel** | Serverless deployment platform for frontend and backend. |

---

## 📸 Application Workflow

1.  **Registration & Login**: Users sign up and select their role (Applicant or Recruiter).
2.  **For Recruiters**:
    *   Post a new job with a title and description.
    *   Go to "My Jobs" to see a list of active postings.
    *   Click "View Applications" to see candidates and update their status (e.g., mark as "Shortlisted").
3.  **For Applicants**:
    *   Browse "Open Jobs" on the dashboard.
    *   Click "Apply" to submit an application.
    *   Go to "My Applications" to see the status of all submitted applications.
4.  **For Admins**:
    *   Access the Admin Dashboard to delete users or manage global content.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
*   Node.js (v18+)
*   npm

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/GauravVNavada/job-application-portal.git
    cd job-application-portal
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the `backend` directory:
    ```env
    DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"
    JWT_SECRET="your-super-secret-key"
    PORT=5000
    ```

4.  **Database Migration**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Run the Application**
    ```bash
    npm run dev
    ```
    *   Frontend: `http://localhost:3000`
    *   Backend: `http://localhost:5000`

---

## 📂 Project Structure (Monorepo)

```
.
├── frontend/             # Next.js Application
│   ├── src/app/          # App Router Pages
│   ├── src/components/   # Reusable UI Components
│   └── src/services/     # API Integration
├── backend/              # Express API
│   ├── src/controllers/  # Business Logic
│   ├── src/routes/       # API Endpoints
│   └── prisma/           # Database Schema
├── package.json          # Root configuration
└── vercel.json           # Deployment configuration
```

---

## 🤝 Contribution & License

This project was created for the Ellipsonic Internship. Code is available for review and educational purposes.
