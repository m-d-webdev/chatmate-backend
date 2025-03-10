import { log } from "console";
import jwt from "jsonwebtoken";

const VerifyToken = (req, res, next) => {
    try {
        const authz = req.headers.authorization;
        const token = authz.split(' ')[1] || null;
        if (!token) return res.status(419).send(" no token founded on request ")

        jwt.verify(token, process.env.JWTCODE, (err, decoded) => {
            if (err) return res.status(401).send("invalide token");
            req.body.user = decoded.user
            req.query.user = decoded.user
            return next();
        })

    } catch (error) {
        return res.status(401).send("unauthorized")
    }
}

export default VerifyToken