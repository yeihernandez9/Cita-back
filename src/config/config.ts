// src/config/config.ts

// Define una interfaz para la configuración de la base de datos
interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    
  }
  
  // Define una interfaz para la configuración completa de la aplicación
  interface AppConfig {
    port: number;
    db: DatabaseConfig;
  }
  
  // Carga las variables de entorno usando dotenv
  import dotenv from 'dotenv';
  dotenv.config();
  
  // Define la configuración utilizando las variables de entorno
  const config: AppConfig = {
    port: Number(process.env.PORT) || 3000,
    db: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'defaultUser',
      password: process.env.DB_PASSWORD || 'defaultPassword',
      database: process.env.DB_NAME || 'defaultDatabase',
      
    },
  };
  
  export default config;