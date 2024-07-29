import express from 'express';
import cors from 'cors'; 
import 'reflect-metadata';
import setupSwagger from './config/swagger';
import config from './config/config';
import AppDataSource from './config/ormconfig';
import authRoutes from './routes/authRoutes';
import privateRoutes from './routes/privateRoutes';


const app = express();
const port = config.port || 3000;

// Middleware para manejar JSON
app.use(express.json());
app.use(cors());
// Configuración de Swagger
setupSwagger(app);

// Configuración de rutas
app.use('/api/auth', authRoutes);
app.use('/api', privateRoutes);

// Inicialización de la fuente de datos y arranque del servidor
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
