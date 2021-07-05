import {ma,getData,wma, rsi} from "./index.js"
import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.use(cors())

app.get("/crypto/ma",async (req,res)=>{
     let coin=JSON.stringify(req.query).toLowerCase()
     coin=JSON.parse(coin)
     let coinname=String(coin.symbol).toUpperCase()
     let interval=coin.interval ? coin.interval : "1d"
     let limit = coin.limit ? coin.limit : 50
     let data=await ma(coinname,interval,limit)
     res.status(200).json({
        ma : data
     })
})
app.get("/crypto/wma",async(req,res)=>{
   let coin=JSON.stringify(req.query).toLowerCase()
     coin=JSON.parse(coin)
     let coinname=String(coin.symbol).toUpperCase()
     let interval=coin.interval ? coin.interval : "1d"
     let limit = coin.limit ? coin.limit : 50
     let data=await wma(coinname,interval,limit)
     res.status(200).json({
        wma : data
     })
})
app.get("/crypto/rsi",async(req,res)=>{
   let coin=JSON.stringify(req.query).toLowerCase()
     coin=JSON.parse(coin)
     let coinname=String(coin.symbol).toUpperCase()
     let interval=coin.interval ? coin.interval : "1d"
     let limit = coin.limit ? coin.limit : 50
     let data=await rsi(coinname,interval,limit)
     res.status(200).json({
        rsi : data
     })
})
app.listen(5000,()=>console.log("server is running"))