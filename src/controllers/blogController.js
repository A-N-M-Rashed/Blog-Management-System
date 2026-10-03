const blogModel = require("../models/blogModel");

//create blog
exports.createBlog = async (req, res) => {
    try {
        const {
            title,authorName, content, tags, blogImage,
        }= req.body;
        const user_id = req.headers._id;
        let data= await blogModel.create({
            title,
            authorName, 
            content, 
            tags, 
            blogImage, 
            user_id            
        });

        res.status(200).json({
            success: true,
            message: "Blog Created Successfully",
            data,
        });



    } catch (error) {
        res.status(500)
            .json({
                success: false,
                error: error.toString(),
                message: "Something went wrong."
            });
    }
}