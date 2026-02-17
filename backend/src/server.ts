import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config/env';
import { tryonRoutes } from './routes/tryon.routes';
import { healthCheck } from './controllers/tryon.controller';
import { errorHandler } from './middleware/error.middleware';

const app = express();

// Security
app.use(helmet());
app.use(cors());

// Rate limiting: 20 requests per minute per IP
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: { success: false, error: 'Too many requests. Please wait a moment.' },
});
app.use(limiter);

// Body parsing
app.use(express.json());

// Routes
app.get('/api/health', healthCheck);
app.use('/api/tryon', tryonRoutes);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(config.PORT, () => {
    console.log(`\n🚀 Virtual Try-On Backend`);
    console.log(`   Port: ${config.PORT}`);
    console.log(`   Mock AI: ${config.USE_MOCK_AI ? 'ENABLED' : 'DISABLED'}`);
    console.log(`   Health: http://localhost:${config.PORT}/api/health\n`);
});

export default app;
