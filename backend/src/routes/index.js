// API route definitions
const express = require("express");
const router = express.Router();
const multer = require("multer");
const compareController = require("../controllers/compareController");

// Sử dụng memory storage để không lưu file
const storage = multer.memoryStorage();

// Filter chỉ cho phép file xlsx
const fileFilter = (req, file, cb) => {
    if (file.originalname.toLowerCase().endsWith(".xlsx")) {
        cb(null, true);
    } else {
        cb(new Error("Chỉ chấp nhận file Excel định dạng .xlsx"), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

router.post("/compare", upload.fields([{ name: "file1" }, { name: "file2" }]), compareController.compare);

module.exports = router;
