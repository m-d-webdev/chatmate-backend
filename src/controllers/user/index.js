import jwt from "jsonwebtoken"
import users from "../../models/User.js"
import { log } from "console"

export const GetProfileData = async (req, res) => {
    try {

        const { userName } = req.query
        const data = await users.findOne({ userName }, { fullName: 1, pic: 1, userName: 1, email: 1, createdAt: 1, status: 1 })
        if (!data) return res.status(404).send("user not found")
        return res.status(200).json(data);
    } catch (error) {
        console.log(error);

        return res.status(500).send("error => " + error)
    }
}

export const ChangeProfilePic = async (req, res) => {
    try {
        const { user } = req.query
        const file = req.file
        await users.updateOne({ _id: user._id }, { $set: { pic: `${process.env.PUBLIC_PATH}${file.path.replace(/\\/g, "/")}` } })
        const token = jwt.sign({ user: { ...user, pic: `${process.env.PUBLIC_PATH}${file.path.replace(/\\/g, "/")}` } }, process.env.JWTCODE)
        res.cookie("token", token)
        return res.status(200).send({ message: "pic uploaded", newUrl: `${process.env.PUBLIC_PATH}${file.path.replace(/\\/g, "/")}` })

    } catch (error) {
        console.log(error);

        return res.status(500).send('failed to upload pic');
    }
}

export const updateFullName = async (req, res) => {
    try {
        const { user, newFullName } = req.body
        await users.updateOne({ _id: user._id }, { $set: { fullName: newFullName } })
        const token = jwt.sign({ user: { ...user, fullName: newFullName } }, process.env.JWTCODE)
        res.cookie("token", token)
        return res.status(200).send({ message: "full name changed", newFullName })

    } catch (error) {
        console.log(error);

        return res.status(500).send('failed to upload pic');
    }
}
export const updateUserStatus = async (req, res) => {
    try {
        const { user, newStatus } = req.body
        await users.updateOne({ _id: user._id }, { $set: { status: newStatus } })
        const token = jwt.sign({ user: { ...user, status: newStatus } }, process.env.JWTCODE)
        res.cookie("token", token)
        return res.status(200).send({ message: "status changed", newStatus })

    } catch (error) {
        console.log(error);

        return res.status(500).send('failed to upload pic');
    }
}


