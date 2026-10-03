const { DecodeToken } = require("../utility/tokenHelper");

module.exports= (req, res, next)=>{
    let token= req.cookies["u__token"];
    let decoded= DecodeToken(token);

    if(decoded===null){
        return res.status(401).json({
            status: 401,
            message: "Invalid Token",
        })
    }else{
        let email = decoded["email"];
        let _id= decoded("id");
        req.headers.email= email;
        req.headers._id= _id;

        next();
    }
}