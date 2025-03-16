import { log } from "console";
import OpenAI from "openai";
import {configDotenv} from "dotenv"
configDotenv()
const key = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
    apiKey: key
});




const Ai_Response = async (chatHistroy = []) => {
    return new Promise(
        async (resolve, reject) => {

            try {
                const response = await openai.chat.completions.create({
                    model: "o3-mini",
                    store: true,
                    messages: chatHistroy,
                });

                resolve({ reply: response.choices[0].message.content });
            } catch (error) {
                console.log(error);
                reject({ error: "Error communicating with OpenAI" });
            }
        }
    )
}


export default Ai_Response