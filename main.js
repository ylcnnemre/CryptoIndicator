import {ma,getData} from "./index.js"
import express from "express"
import cors from "cors"
const app=express()
app.use(cors())
app.get("/",async(req,res)=>{
   let data= await getData()
   console.log(data)
   res.status(200).json({
        value : data.data[9][4]
   })
})

app.listen(5000,()=>console.log("server is running"))