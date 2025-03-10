import mongoose from 'mongoose'


const TableSchema = new mongoose.Schema({
    participants: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
    type: {
        type: String,
        required: true
    },
    admins: {
        type: [mongoose.Schema.Types.ObjectId],
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
})

export default mongoose.model("chats", TableSchema);
