const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://vamsimannem003_db_user:<db_password>@cluster0.die30a8.mongodb.net/?appName=Cluster0/places")
    .then(()=>console.log("MongoDB Connected"))
    .catch((err)=>console.error(err));

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
});