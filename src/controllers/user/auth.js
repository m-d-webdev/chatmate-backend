import users from '../../models/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { log } from 'console';


export const loginUser = async (req, res) => {
    try {
        const { emailOrName, password } = req.body;
        const user = await users.findOne({
            $or:
                [
                    {
                        email: emailOrName
                    },

                    {
                        userName: emailOrName
                    }
                ]
        });
        if (!user) return res.status(401).send("Failed to auth user");
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) return res.status(401).send("pass");

        delete user._doc['password'];
        const token = jwt.sign({ user }, process.env.JWTCODE);
        if (token) {

            console.log("token generated => ", token)
            return res.status(200).json({ token })
        } else {

            return res.status(500).send("Falied to generate toeken ")
        }

    } catch (error) {
        return res.status(500).send("Failed to auth user => ", error)
    }
}

export const NewUser = async (req, res) => {
    try {

        const { fullName, email, password, userName } = req.body;
        const _newUser = await users.create({ fullName, email, password, userName });
        delete _newUser._doc['password'];
        let token = jwt.sign({ user: _newUser }, process.env.JWTCODE)
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).send("failed to registed this user")
    }
}


export const CheckEmailExist = async (req, res) => {
    try {

        const { email } = req.query;
        const isExist = await users.findOne({ email }, {});

        if (isExist) return res.status(200).json({ message: "email exists", isExist: true });

        return res.status(200).json({ message: "email not  exists", isExist: false });


    } catch (error) {
        return res.status(500).send("failed to registed this user")
    }
}

export const checkUserNameExsits = async (req, res) => {
    try {

        const { userName } = req.query;
        const isExist = await users.findOne({ userName }, {});

        if (isExist) return res.status(200).json({ message: "UserName exists", isExist: true });

        return res.status(200).json({ message: "UserName not  exists", isExist: false });


    } catch (error) {

        return res.status(500).send("failed to registed this user")
    }
}



export const authenticateUser = async (req, res) => {
    try {
        const { user } = req.body;
        const data = await users.findOne({ _id: user._id }, { fullName: 1, email: 1, pic: 1, userName: 1, status: 1 });
        return res.status(200).json(data)
    } catch (error) {
        log(error)
        return res.status(500).send("Falied to authUser => " + error)
    }
}
