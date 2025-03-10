import express from 'express'
import VerifyToken from '../config/middlwares/VerifyToken.js';
import { AskOwlia } from '../controllers/owlia/index.js';

const Router = express.Router();

Router.post("/ask",  AskOwlia );


export default Router