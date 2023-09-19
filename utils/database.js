import mongoose from "mongoose";
let isConnected=false;
export const ConnectionDB =async()=>{
    mongoose.set('strictQuery',true)
    
}
