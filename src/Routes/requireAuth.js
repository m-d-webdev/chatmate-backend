import express from 'express'
import VerifyToken from '../config/middlwares/VerifyToken.js';
import { ChangeProfilePic, updateFullName, updateUserStatus } from '../controllers/user/index.js';
import multerUpload from '../multerUpload.js';
import { getChatList, GetChatMessages, GetSuggestionMates, AddChatMessage } from '../controllers/chat/index.js';
import { fetchReq, NewMateReq, AcceptMate } from '../controllers/user/mate.js';
// ----------------------


// ----------------------

const Router = express.Router();


Router.post('/user/ChangePic', VerifyToken, multerUpload.single("pic"), ChangeProfilePic)
Router.post('/user/updateFullName', VerifyToken, updateFullName)
Router.post('/user/updateUserStatus', VerifyToken, updateUserStatus)
Router.get('/user/getChatList', VerifyToken, getChatList)

Router.get("/user/get", VerifyToken, (req, res) => {
    try {
        return res.status(200).json({ user: req.query.user })
    } catch (error) {
        return res.status(500).send("Failed to get user data")
    }
})

// ------------------ 
Router.get('/meetMates/suggestions', VerifyToken, GetSuggestionMates)
Router.post('/meetMates/new', VerifyToken, NewMateReq)
Router.get('/meetMates/fetchReq', VerifyToken, fetchReq)
Router.post('/meetMates/accept', VerifyToken, AcceptMate);

// ---------
Router.post("/chat/GetChatMessages", VerifyToken, GetChatMessages)
Router.post("/chat/addMessage", VerifyToken, AddChatMessage)


// ---------------
Router.post('/logout', VerifyToken, (req, res) => {
    res.clearCookie('token')
    return res.status(200).send("")
})

export default Router