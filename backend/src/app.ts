import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
import authRoutes from './routes/authRoutes';
import jobRoutes from './routes/jobRoutes';
import applicationRoutes from './routes/applicationRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Job Application Portal API is running' });
});

export default app;
