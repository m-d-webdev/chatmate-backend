import Ai_Response from '../../config/openai.js'



export const AskOwlia = async (req, res) => {
    try {
        const { chatHistroy , user } = req.body
                
        const answer = await Ai_Response(chatHistroy);
        return res.status(200).json({ answer })
    } catch (error) {
        console.log(error);
        
        return res.status(500).send("Failed to get respoonse from openAi")
    }
}