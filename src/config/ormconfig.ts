
import { DataSource } from 'typeorm';
import config from './config';
import { Doctor } from '../entity/Doctor';
import { User } from '../entity/User';
import { Appointment } from '../entity/Appointment';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: true,
  entities: [Doctor,User, Appointment],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
});

export default AppDataSource;