import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createTable } from './data/createSchoolTable.js';
import schoolRouter from './routes/schoolRoutes.js';
import errorHandling from './middlewares/errorHandler.js';

// load env vars
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

// Routes
app.use('/api', schoolRouter);

// global error handler
app.use(errorHandling);

(async () => {
	try {
		await createTable();
		app.listen(PORT, () => {
			console.log(`Server started at port: ${PORT}`);
		});
	} catch (err) {
		console.error('Initialization failed', err);
		process.exit(1);
	}
})();
