import { log } from 'console'
import bodyParser from "body-parser"
import cors from 'cors'
import express from 'express'
import session from 'express-session'
import { configDotenv } from 'dotenv'

import guestRoutes from './Routes/guestRoutes.js'
import AuthRoutes from './Routes/requireAuth.js'
import OwliaRoutes from './Routes/owliaRoutes.js'
import cookieParser from 'cookie-parser'
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';



const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

// -------------
configDotenv();



const app = express()

// --------------

app.use(cors({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL],
    credentials: true,
    methods: ["GET", "POST"]
}))
app.use(cookieParser())
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRIT,
    resave: false,
    saveUninitialized: true
}));


app.use('/src/public', express.static(path.join(__dirname, 'public')));

// ----------

app.get('/', (req, res) => {
    return res.send("Hi brother")
})

app.use(guestRoutes)
app.use(AuthRoutes)
app.use('/owlia', OwliaRoutes)




export default app

