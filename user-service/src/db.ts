// src/db.ts
import { Pool } from 'pg';
import config from './config/config';

const pool = new Pool({
  host: config.dbHost,
  port: config.dbPort,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
});

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};