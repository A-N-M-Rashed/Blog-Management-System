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

//Read All Blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find()
            .populate("user_id", "name email") 
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            count: blogs.length,
            data: blogs,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong.",
        });
    }
};