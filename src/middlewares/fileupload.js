const multer = require("multer");
const path = require("path");

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../uploads")); // Adjust path as needed for your folder structure
    },
    filename: (req, file, cb) => {
        const sanitizedFilename = file.originalname.replace(/\s+/g, "");
        cb(null, "api-img-" + Date.now() + "-" + sanitizedFilename);
    },
});

const upload = multer({
    storage: fileStorageEngine,
    limits: { fileSize: 200 * 1024 }, // 200KB limit
    fileFilter: (req, file, cb) => {
        cb(null, true);
    },
}).single("blogImage"); 

const fileUploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            if (err?.code === "LIMIT_FILE_SIZE") {
                return res.status(400).json({
                    success: false,
                    message: "File too large! Maximum size is 200kb"
                });
            }
            return res.status(400).json({
                success: false,
                message: "File upload failed."
            });
        }
        next();
    });
};

module.exports = fileUploadMiddleware;