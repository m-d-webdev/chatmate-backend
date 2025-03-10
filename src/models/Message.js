import mongoose from 'mongoose'

const TableSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    chat_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    readBy: {
        type: [mongoose.Schema.Types.ObjectId],
    },
    isSent: {
        type: Boolean,
        required: false
    },
    recievedBy: {
        type: [mongoose.Schema.Types.ObjectId],
    },
    sendAt: {
        type: Date,
        default: Date.now
    },
})

export default mongoose.model("messages", TableSchema)