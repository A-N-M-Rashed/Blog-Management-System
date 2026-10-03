const mongoose= require("mongoose");
const bcrypt= require("bcrypt");
const DataSchema= new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
    }

},
{
    timestamps: true,
    versionKey: false,
});

//Hashing Password
DataSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error);
    }
}); 
const userModel= mongoose.model("Users", DataSchema);
module.exports= userModel;