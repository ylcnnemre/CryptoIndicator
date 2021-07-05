import axios from "axios"

async function getData(symbol="BTCUSDT",interval="1d",limit=50)
{
  
    try{
      let result= await axios.get(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`)
     
      if(result.data.length==limit)
      {
         
         return {
             data : result.data,
             msg : true
         }
      }     
      else{
          return {
              data : "Invalid Limit",
              msg : false
          }
      }

    }
    catch(err)
    {
        return {
            data : err.response.data.msg,
            msg : false
        }
    }
}


/* ma */
 async function ma(symbol="BTCUSDT",interval="1d",limit=200)
{ 
    let result=await getData(symbol,interval,limit)
    
    if(result.msg)
    {
        let sum=0

        result.data.map((val,index)=>{
            sum +=parseFloat(val[4])
        })
        sum = (sum/limit).toFixed(4)

        return sum


    }
    else{
        return result.data
    }


} 

/* Ema */
/* async function ema(symbol="BTCUSDT",interval="1d",limit=50)   // sorun var
{
     let factor=2/(limit+1)
    
   
    let result = await getData(symbol,interval,limit)
    console.log(result.data.length)
    let ema1=result.data[result.data.length-1][4]
 
    
     for(let i=result.data.length-1;i>=0;i--)
    { 
       console.log(result.data[i][4])
       ema1= factor*result.data[i][4] + (1-factor)*ema1
     
    }   
    console.log(ema1)
}   

ema() */

/* Wma */
async function wma(symbol="BTCUSDT",interval="1d",limit=50)
{
    let values=   await  getData(symbol,interval,limit)
    let sum=0
    for(let i=values.data.length-1;i>=0;i--)
    {
        sum+=values.data[i][4]*(i+1)
    }
    let dividing= (limit*(limit+1))/2
    let result= sum/dividing
    return result
}










    async function rsi(symbol="BTCUSDT",interval="1d",limit=14)
    {
        let value=await getData(symbol,interval,limit+1)

        let positive=0
        let negative=0
        for(let i=1;i<value.data.length;i++)
        {
            let val=value.data[i][4]-value.data[i-1][4]
            
            if(val>0)
            {
                positive+=val
                console.log("positive " + positive)
            }
            else{
                negative+=val;
                console.log("negative " + negative)
            }
        }
        let rs=positive / Math.abs(negative)

        let rsi=100-100/(1+rs)
        
        return rsi.toFixed(3)
    }



    
export {
    ma,
    getData,
    wma,
    rsi
}

