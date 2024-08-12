import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true

}))


app.use(express.json({ limit: '50kb'  }))
app.use(express.urlencoded({extended:true, limit: '50kb'  }))

app.use(express.static('public'))
app.use(cookieParser())

//routes import 
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)


//prefix
//htttp://localhost:8000/users
// prefix with suffix
//htttp://localhost:8000/users/register




export {app}

