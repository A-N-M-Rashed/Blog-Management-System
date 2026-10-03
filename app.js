const express = require("express");
const app = new express();
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const path = require("path");
const cors = require("cors");
const cookieParser = require("Cookie-parser");
const mongoose = require("mongoose");
const dotENV = require("dotenv");
const strict = require("assert/strict");
const router = require("./src/routes/api");

dotENV.config();

//Connect to MongoDB
let URL = process.env.MONGO_URL;
let option = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    autoIndex: true,
    serverSelectionTimeoutMS: 50000
}

mongoose.connect(URL, option)
    .then((res) => {
        console.log("Database Connected");
    }).catch((error) => {
        console.log(error);
    });

mongoose.set("strictQuery", false);

//Global Middlewares
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost: 5001","http://localhost: 3001" ],
    credentials: true,
}));

app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "img-src": ["'self'", "https: data:"],
        },
    })
);

app.use((req, res, next) => {
    Object.defineProperty(req, 'query', {
        value: { ...req.query },
        writable: true,
        configurable: true,
        enumerable: true,
    });
    next();
});

app.use(mongoSanitize());
app.use(hpp());

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb"}));
const limiter= rateLimit({windowMs: 15*60*1000, max: 3000});
app.use(limiter);
app.use("/api/v1", router);

app.use("/api/v1/get/get-file", express.static("uploads"));

module.exports= app;
