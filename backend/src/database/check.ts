import { checkDbConnection } from "./db.js"

export const check = async()=>{
    const isConnected = await checkDbConnection()
    try{
        if (isConnected){
        console.log('Database Connected Successfully')
    }
    }catch(err){
        console.log('Database Not connected', err)
    }
    
}