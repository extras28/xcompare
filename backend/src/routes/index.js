// API route definitions
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const compareController = require("../controllers/compareController");

const upload = multer({ dest: path.join(__dirname, "../../uploads") });

router.post("/compare", upload.fields([{ name: "file1" }, { name: "file2" }]), compareController.compare);

module.exports = router;
