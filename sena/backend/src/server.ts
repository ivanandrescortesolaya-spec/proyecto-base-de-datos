import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import aprendizRoutes from './routes/aprendiz.routes';
import matriculaRoutes from './routes/matricula.routes';

const app = express();
const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sena_matricula';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/aprendices', aprendizRoutes);
app.use('/api/matriculas', matriculaRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'SENA Matrícula API - MVP' });
});

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error);
    process.exit(1);
  });

export default app;
