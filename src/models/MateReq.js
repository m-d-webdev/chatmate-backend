import mongoose from 'mongoose'


const TableSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }

})


export default mongoose.model("MateReqs", TableSchema)