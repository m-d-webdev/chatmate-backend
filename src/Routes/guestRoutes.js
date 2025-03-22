import express from 'express';
import { CheckEmailExist, loginUser, NewUser, checkUserNameExsits, authenticateUser, NewUserFromPopup, LoginUserFromPopup } from '../controllers/user/auth.js';
import authToken from '../config/middlwares/authToken.js';
import { GetProfileData } from '../controllers/user/index.js';
import { GET_FIREBASE_CONFIGS } from '../config/firebaseData.js';

const Router = express.Router();


Router.post('/login', loginUser);
Router.post('/loginFromPopup', LoginUserFromPopup);
Router.post('/register', NewUser);
Router.post('/registerFromPopup', NewUserFromPopup);
Router.get('/checkEmailExsits', CheckEmailExist);
Router.get('/checkUserNameExsits', checkUserNameExsits);
Router.post('/authenticateUser', authToken, authenticateUser);


Router.get('/user', GetProfileData);
Router.get('/GET_FIREBASE_CONFIGS', GET_FIREBASE_CONFIGS);


export default Router