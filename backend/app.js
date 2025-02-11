// delete account and data from cloudinary
import express from "express" ;
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from './routes/company.route.js'
import jobRoute from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'
import path from 'path'

dotenv.config({})

const app = express()
const port =  process.env.PORT || 80
const corsOptions  = {
    origin:process.env.URL,
    credentials:true
}

const __dirname = path.resolve()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors(corsOptions))


// api
app.use('/api/v1/user',userRoute)
app.use('/api/v1/company',companyRoute)
app.use('/api/v1/job',jobRoute)
app.use('/api/v1/application',applicationRoute)

app.use(express.static(path.join(__dirname,'/frontend/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'))
})


app.get('/',(req,res)=>{
    res.send('home')
})

app.listen(port,()=>{
    connectDB()
    console.log(`Server running at http://localhost:${port}`)
})