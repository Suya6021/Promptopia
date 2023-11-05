import mongoose from "mongoose";
let isConnected=false;
export const ConnectToDB =async()=>{
    mongoose.set('strictQuery',true)
    if(isConnected){
        console.log("mongoDB is Connected ")
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt"
        })
    isConnected=true;
    console.log("MongoDB Connected")

    }
    catch(error){
        console.log(error)
    }
    
    
}
