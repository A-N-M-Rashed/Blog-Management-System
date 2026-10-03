const mongoose= require("mongoose");
const DataSchema= new mongoose.Schema({
    blogImage: [String],
    title:{
        type: String,
        required: true,
        trim: true,
    },
    authorName:{
        type: String,
    },
    content:{
        type: String,
        required: true,
    },
    tags:{
        type: [String],
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "Users",
    }

},
{
    timestamps: true,
    versionKey: false,
});

const blogModel= mongoose.model("Blog", DataSchema);
module.exports= blogModel;