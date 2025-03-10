import multer from 'multer'

const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, "src/public/uploads")
        },
        filename: (req, file, cb) => {
            const now = new Date();
            cb(null, `${now.getMilliseconds()}${Math.random() * 6543}_${file.originalname}`)
        },
    }
)


export default multer({ storage })