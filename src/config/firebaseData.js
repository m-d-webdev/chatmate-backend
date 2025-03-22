import { configDotenv } from "dotenv"
configDotenv()

export const GET_FIREBASE_CONFIGS = async (req ,res) => {
    try {
        const {
            FIRRBASE_apiKey,
            FIRRBASE_authDomain,
            FIRRBASE_projectId,
            FIRRBASE_storageBucket,
            FIRRBASE_messagingSenderId,
            FIRRBASE_appId
        } = process.env;


        return res.status(200).send({
            FIRRBASE_apiKey,
            FIRRBASE_authDomain,
            FIRRBASE_projectId,
            FIRRBASE_storageBucket,
            FIRRBASE_messagingSenderId,
            FIRRBASE_appId
        })


    } catch (error) {
        return res.status(500).send("Failed to get firebase configs => ", error)
    }
}