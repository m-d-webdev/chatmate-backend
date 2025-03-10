import chats from "../../models/Chat.js";
import messages from "../../models/Message.js";
import users from "../../models/User.js";

export const getChatList = async (req, res) => {
    try {
        const { user } = req.body;
        const Listchat = await chats.find({
            participants: user._id
        });
        let chatList = await Promise.all(
            Listchat.map(async c => {


                if (c.type == "direct") {

                    let friendid = c.participants.filter(f => f != user._id)[0];
                    let mate = await users.findOne({ _id: friendid }, { pic: 1, fullName: 1, userName: 1 })
                    let LastMessage4 = await messages.find({ chat_id: c._id }).sort({ sendAt: -1 }).limit(1)
                    return { chat_id: c._id, mate, LastMessage: LastMessage4[0], type: c.type }

                }
            })
        )
        return res.status(200).json({ chats: chatList })

    } catch (err) {
        return res.status(500).send('failed =>' + err)
    }
};

export const GetSuggestionMates = async (req, res) => {
    try {
        const { user } = req.body
        let Listchat = await chats.find({
            participants: user._id
        });

        const ids = [user._id];

        Listchat.map(e => {
            if (e.type == "direct") {
                let friendid = e.participants.filter(f => f != user._id)[0];
                if (!ids.includes(friendid)) {
                    ids.push(friendid);
                }
            }
        })

        const suggestions = await users.find({ _id: { $nin: ids } }, { userName: 1, fullName: 1, pic: 1 });
        return res.status(200).json({ suggestions })
    } catch (err) {
        return res.status(500).send('failed =>' + err)
    }
};


export const GetChatMessages = async (req, res) => {
    try {

        const { chat_id, user } = req.body
        const Chatarticipants = await chats.findOne({ _id: chat_id }, { participants: 1 })
        if (!Chatarticipants || !Chatarticipants.participants.includes(user._id)) return res.status(404).send("chatNotFound")

        let Chatmessages = await messages.find({ chat_id }).sort({ sendAt: -1 }).limit(50);
        // Chatmessages = await Promise.all(
        //     Chatmessages.map(ms => {
        //         ms.content = JSON.parse(ms.content);
        //         return ms
        //     })
        // )
        return res.status(200).json({ Chatmessages: Chatmessages.sort((a, b) => new Date(a._doc.sendAt) - new Date(b._doc.sendAt)) })
    } catch (err) {
        return res.status(500).send('failed =>' + err)
    }
};

// ---------
export const AddChatMessage = async (req, res, next) => {
    try {

        const { user, content, type, chat_id, _id, recievedBy, readBy } = req.body
        const { isSent } = req.body || true
        console.log(content);
        
        let dbRes = await messages.create({
            _id,
            senderId: user._id,
            content, 
            recievedBy,
            type,
            isSent,
            readBy,
            chat_id,
        })
        // Your code here
        return res.status(200).json(dbRes)
    } catch (err) {
        return res.status(500).send('failed =>' + err)
    }
};