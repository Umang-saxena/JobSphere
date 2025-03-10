import mongoose from "mongoose";

export const connection= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            dbName:"Job Sphere",
        });
        console.log("MongoDB Connection Successful");
    }catch(error){
        console.log(error);
    }
};