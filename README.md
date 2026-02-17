# Job Application Portal with RBAC

A production-ready Internship Evaluation Project featuring Role-Based Access Control, JWT Authentication, and a modern Next.js Frontend.

## 🚀 Features
- **3-Role System**: Admin, Recruiter, Applicant.
- **Dashboards**: Dedicated views for each role.
- **Job Management**: Recruiters can post and close jobs.
- **Application Tracking**: Applicants can track status (Applied -> Shortlisted -> Accepted).
- **Security**: HttpOnly Cookies (optional), JWT, Bcrypt, Helmet, CORS.

## 🛠 Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, TypeScript.
- **Backend**: Node.js, Express, Prisma ORM.
- **Database**: PostgreSQL.

## 🏃‍♂️ Quick Start

1.  **Backend**:
    ```bash
    cd backend
    npm install
    # Setup .env
    npx prisma migrate dev --name init
    npm run dev
    ```

2.  **Frontend**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

3.  Visit `http://localhost:3000`.

## 📂 Architecture
- `backend/`: Express API with MVC pattern.
- `frontend/`: Next.js App Router with Service Layer pattern.

See `DEPLOYMENT.md` for deployment instructions.
