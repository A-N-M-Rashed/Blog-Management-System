const fileModel= require("../models/fileModel");
//file upload
exports.fileUpload = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        const { filename } = req.file;
        let data = await fileModel.create({ filename });
        return res.status(200).json({
            success: true,
            message: "File uploaded Successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.toString(), message: "Something went wrong." });
    }
};