import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// load environment vars immediately
dotenv.config();

const connection = await mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_NAME || 'testdb',
	port: parseInt(process.env.DB_PORT, 10) || 3306,
});

// with promise API createConnection returns a connected instance
console.log('Connected to MySQL');

export default connection;
