// Controller for Excel comparison
const excelService = require("../services/excelService");

exports.compare = async (req, res) => {
    try {
        if (!req.files?.file1?.[0] || !req.files?.file2?.[0]) {
            return res.status(400).json({ error: "Vui lòng upload cả 2 file Excel" });
        }
        const file1 = req.files.file1[0];
        const file2 = req.files.file2[0];
        const result = await excelService.compareExcels(
            file1.buffer,
            file2.buffer,
            file1.originalname,
            file2.originalname
        );
        res.json(result);
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: err.message });
    }
};
