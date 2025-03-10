import express from 'express';
import { CheckEmailExist, loginUser, NewUser, checkUserNameExsits, authenticateUser } from '../controllers/user/auth.js';
import authToken from '../config/middlwares/authToken.js';
import { GetProfileData } from '../controllers/user/index.js';

const Router = express.Router();


Router.post('/login', loginUser);
Router.post('/register', NewUser);
Router.get('/checkEmailExsits', CheckEmailExist);
Router.get('/checkUserNameExsits', checkUserNameExsits);
Router.post('/authenticateUser', authToken, authenticateUser);


Router.get('/user', GetProfileData);


export default Router