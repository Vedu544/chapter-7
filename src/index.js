import dotenv from 'dotenv';
import connectDB from './db/db.js';
import express from 'express';
import {app} from './app.js';


dotenv.config({
    path: './env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is runing on port ${process.env.PORT}`);
    })
}).catch((err)=>{
    console.log("mongoDB connection error: ", err);
})





// ( async ()=>{
//     try {
//          await mongoose.connect(`${process.env.MONGODB_URI}`)
//         {DB_NAME}
//         app.on("error",()=>{
//             console.log(error);
//             throw new Error('Failed to connect to MongoDB');
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         })
        
//     } catch (error) {
//         console.log(error);
//         throw new Error('Failed to connect to MongoDB');
        
//     }
// })

export default connectDB;