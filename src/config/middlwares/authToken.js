import { log } from "console";
import jwt from "jsonwebtoken"
import { decode } from "punycode";

const authToken = async (req, res , next) => {
    try {
        const { token } = req.body;
        if (!token) return res.status(403).json({ message: "No token found on request  ", isTokenValide: false })
        jwt.verify(token, process.env.JWTCODE, (err, decoded) => {
            if (err) {

                return res.status(401).json({ message: "Token verification failed ", err: err, isTokenValide: false })
            }   
            req.body.user = decoded.user
            req.query.user = decoded.user
            return next();
        })
    } catch (error) {
        return res.status(500).json({ message: "Token verification failed ", err: error, isTokenValide: false })
    }
}

export default authToken;
