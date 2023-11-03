import express from 'express';
import grammarController from '../controllers/grammarController.js';

const grammarRouter = express.Router();
grammarRouter.post('/check', grammarController.grammarCheck);
export default grammarRouter;
