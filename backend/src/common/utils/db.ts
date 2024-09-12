import mysql, { Pool } from 'mysql2/promise';
import { env } from '@/common/utils/envConfig';

// Create the pool
const pool: Pool = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    connectionLimit: 10,
    timezone: 'Z',
    dateStrings: true,
    multipleStatements: true
});

export default pool;
