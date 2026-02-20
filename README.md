# Job Application Portal with RBAC

## 🚀 Live Demo

**🌐 Vercel**: [job-application-portal-delta.vercel.app](https://job-application-portal-delta.vercel.app)
**📦 GitHub**: [github.com/GauravVNavada/job-application-portal](https://github.com/GauravVNavada/job-application-portal)

### Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@portal.com` | `admin123` |
| **Recruiter** | Register with role "Recruiter" | — |
| **Applicant** | Register with role "Job Seeker" | — |

> **Note**: Admin accounts cannot be created via the public registration form for security. Use the credentials above to test admin features.

---

## 🎯 Project Overview

A full-stack **Job Application Portal** built with modern technologies, featuring a robust **Role-Based Access Control (RBAC)** system. The platform streamlines the recruitment process by connecting Job Seekers with Recruiters, all managed under an Admin panel.

Built for the **Ellipsonic Internship Assignment**.

### Key Features

- **3-Role RBAC**: Admin, Recruiter, and Applicant — each with distinct permissions
- **Job Management**: Recruiters post jobs, track applicants, and update statuses
- **Application Tracking**: Real-time status tracking (Pending → Shortlisted → Accepted/Rejected)
- **Admin Dashboard**: Full control over users and job listings
- **Modern UI**: Indigo-themed design with animations, glassmorphism, and responsive layout
- **Secure Auth**: JWT-based authentication with Bcrypt password hashing
- **Cloud Deployed**: Vercel (frontend + serverless backend) + Neon PostgreSQL

### Requirements Compliance

| Requirement | Status |
| :--- | :--- |
| **Frontend: Next.js** | ✅ Next.js 16 (App Router) |
| **Backend: Node.js** | ✅ Express + Node.js |
| **Database: PostgreSQL** | ✅ Neon (Cloud PostgreSQL) |
| **RBAC Implementation** | ✅ 3 Roles with middleware enforcement |
| **Git Repository** | ✅ Structured commits & version control |

---

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express, TypeScript |
| **Database** | PostgreSQL (Neon Cloud) |
| **ORM** | Prisma |
| **Auth** | JWT + Bcrypt |
| **Deployment** | Vercel (Serverless) |
| **Validation** | Zod |

---

## 📸 Application Workflow

1. **Registration & Login** — Users sign up and select their role (Applicant or Recruiter)
2. **For Recruiters**:
   - Post jobs with title and description
   - View all posted jobs in "My Posted Jobs"
   - Click "Applications" to view candidates and update their status
3. **For Applicants**:
   - Browse open jobs on the "Find Jobs" page
   - Apply with a single click
   - Track application status in "My Applications"
4. **For Admins**:
   - Manage all users and jobs from the Admin Dashboard
   - Delete users or job postings as needed

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. **Clone the Repository**
    ```bash
    git clone https://github.com/GauravVNavada/job-application-portal.git
    cd job-application-portal
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Environment Setup**
    Create a `.env` file in the `backend` directory:
    ```env
    DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"
    JWT_SECRET="your-super-secret-key"
    PORT=5000
    ```

4. **Database Migration**
    ```bash
    cd backend
    npx prisma generate --schema=prisma/schema.prisma
    npx prisma db push --schema=prisma/schema.prisma
    ```

5. **Run the Application**
    ```bash
    # From root directory
    npm run dev
    ```
    - Frontend: `http://localhost:3000`
    - Backend: `http://localhost:5000`

---

## 📂 Project Structure (Monorepo)

```
.
├── frontend/               # Next.js Application
│   ├── src/app/            # App Router Pages (auth, dashboard, admin, etc.)
│   ├── src/components/     # Reusable UI Components (Button, Input, Sidebar)
│   ├── src/services/       # API Integration & Auth Services
│   └── src/context/        # React Context (AuthContext)
├── backend/                # Express API
│   ├── src/controllers/    # Business Logic (auth, jobs, applications, users)
│   ├── src/routes/         # API Route Definitions
│   ├── src/middleware/     # Auth & RBAC Middleware
│   └── prisma/             # Database Schema
├── package.json            # Root monorepo configuration
└── vercel.json             # Deployment configuration
```

---

## 🔒 Security

- **JWT Authentication**: Stateless token-based auth stored in cookies
- **Bcrypt Hashing**: Passwords are salted and hashed (never stored in plain text)
- **RBAC Middleware**: Server-side role checks on all protected endpoints
- **Route Guards**: Client-side role enforcement for protected pages
- **Admin Registration Blocked**: Admin accounts cannot be created via public registration

---

## 👤 Author

**Gaurav V Navada**
- GitHub: [@GauravVNavada](https://github.com/GauravVNavada)
- LinkedIn: [gauravvnavada](https://www.linkedin.com/in/gauravvnavada/)

---

*Built with ❤️ for the Ellipsonic Internship Program*
