import { prisma } from "../prisma/lib/prisma.ts";

export const checkDbConnection = async()=>{
    try{
        await prisma.$queryRaw `SELECT 1`
    return true
    }
    catch(err){
        console.log(err)
        return false
    }

}