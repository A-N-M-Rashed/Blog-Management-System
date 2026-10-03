const userModel = require("../models/userModel");
const { EncodeToken } = require("../utility/tokenHelper");
const bcrypt = require("bcrypt");

let options = {
    maxAge: process.env.COOKIE_EXPIRE_TIME,
    httpOnly: false,
    sameSite: "none",
    secure: true,
};

//Create User
exports.register = async (req, res) => {
    try {
        const { name, email, password, phoneNumber } = req.body;
        let user = await userModel.create({ name, email, password, phoneNumber });

        res.status(200).json({
            success: true,
            message: "User created successfully."
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong."
        });
    }
};

//Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(200).json({
                success: true,
                message: "Invalid email or password."
            })
        } else {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(200).json({
                    success: false,
                    message: "Invalid Password",
                })
            } else {
                let token = EncodeToken(user.email, user._id.toString());

                //set cookie
                res.cookie("u__token", token, options);
                res.status(200).json({
                    success: true,
                    message: "Login successfull",
                    user: {
                        id: user._id,
                        email: user.email,
                    },
                    token: token,
                });
            }
        }
    } catch (error) {
        res.status(500)
            .json({
                success: false,
                error: error.toString(),
                message: "Something went wrong."
            });
    }
}

//get-logged in Users
exports.user= async (req, res)=>{
    try{
       let email = req.headers.email;
       let matchStage= {
        $match: {email},
       };

       let project= {
        $project : {
            email: 1,
            name: 1,
            _id: 0
        } 
       }

       let data= await userModel.aggregate([matchStage, project]);
       res.status(200).json({
        success: true,
        data: data[0],
       })
    }catch (error) {
        res.status(500)
            .json({
                success: false,
                error: error.toString(),
                message: "Something went wrong."
            });
    }
}