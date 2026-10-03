const blogModel = require("../models/blogModel");

//create blog
exports.createBlog = async (req, res) => {
    try {
        const {
            title, authorName, content, tags, blogImage,
        } = req.body;
        const user_id = req.headers._id;
        let data = await blogModel.create({
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

// Read Single Blog
exports.getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        const blog = await blogModel.findById(id).populate("user_id", "name email");

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            data: blog,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong.",
        });
    }
};

// Update Blog
exports.updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const loggedInUserId = req.headers._id;
        const { title, authorName, content, tags, blogImage } = req.body;

        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
            });
        }

        if (blog.user_id.toString() !== loggedInUserId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized: You can't update other's blogs",
            });
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(
            id,
            { title, authorName, content, tags, blogImage },
            { new: true, runValidators: true }
        ).populate("user_id", "name email");

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            data: updatedBlog,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.toString(),
            message: "Something went wrong.",
        });
    }
};