import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connection from './configs/db.js';
import { createTable } from './data/createSchoolTable.js';
import schoolRouter from './routes/schoolRoutes.js';
import errorHandling from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(express.json());
app.use(cors());

// Test
app.get('/test', (req, res) => {
	res.send('Server is running perfectly');
});

app.get('/', (req, res) => {
	connection.query('SELECT 1 + 1 AS result', (err, results) => {
		res.json(results);
	});
});

// Routes
app.use('/api', schoolRouter);

// Error Handling
app.use(errorHandling);

await createTable();

app.listen(PORT, () => {
	console.log(`Server started at port: ${PORT}`);
});
