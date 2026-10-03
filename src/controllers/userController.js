const userModel = require("../models/userModel");

//Create User
exports.register= async(req, res)=>{
    try{
        const {name, email, password, phoneNumber}= req.body;
        let user= await userModel.create({name, email, password, phoneNumber});

        res.status(200).json({
            success: true,
            message: "User created successfully."
        });
    }catch(error){
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong."
        });
    }
};