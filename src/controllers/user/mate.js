import chats from "../../models/Chat.js";
import MateReqs from "../../models/MateReq.js";

export const NewMateReq = async (req, res) => {
    try {
        const { mateId, user } = req.body
        let dbRes = await MateReqs.create({
            senderId: user._id,
            to: mateId,
            type: "direct"
        });

        return res.status(200).json(dbRes)
    } catch (err) {
        return res.status(500).send('failed => ' + err)
    }
};

export const fetchReq = async (req, res) => {
    try {
        const { user } = req.body
        let dbRes = await MateReqs.find({
            $or: [
                {
                    senderId: user._id,
                    confirmed: false
                },
                {
                    to: user._id,
                    confirmed: false
                }
            ]
        });

        return res.status(200).json({ matesReq: dbRes })
    } catch (err) {
        return res.status(500).send('failed => ' + err)
    }
};
export const AcceptMate = async (req, res) => {
    try {
        const { user, mateId } = req.body
        let dbRes = await chats.create({
            participants: [
                mateId,
                user._id
            ],
            type: "direct"
        });
        await MateReqs.updateOne(

            {
                senderId: mateId,
                to: user._id
            },
            {
                $set: { confirmed: true }
            }
        )
        return res.status(200).json({ chat_id: dbRes._id })
    } catch (err) {
        return res.status(500).send('failed => ' + err)
    }
};