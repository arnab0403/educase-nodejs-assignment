import express from 'express';
import { addSchool, listSchools } from '../controllers/schoolController.js';
import validateSchool from '../middlewares/inputValidator.js';

const schoolRouter = express.Router();

schoolRouter.post('/school', validateSchool, addSchool);
schoolRouter.get('/school', listSchools);

export default schoolRouter;
