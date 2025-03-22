import mng from 'mongoose'
import bcrypt from 'bcryptjs'


const UserShema = new mng.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true,
            unique: true
        },
        pic: {
            type: String,
            required: false,
            default: "https://i.pinimg.com/236x/57/00/c0/5700c04197ee9a4372a35ef16eb78f4e.jpg"
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            required: false,
        }
    },
    {
        timestamps: true
    }
)


UserShema.indexes({ fullName: 1, userName: 1 })


UserShema.pre("save", async function (next) {
    try {
        if (!this.isModified('password')) return next();
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        return next();
    } catch (error) {
        console.log(error);
    }
})


export default mng.model("users", UserShema);