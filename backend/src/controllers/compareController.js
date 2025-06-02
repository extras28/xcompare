// Controller for Excel comparison
const excelService = require("../services/excelService");

exports.compare = async (req, res) => {
    try {
        const file1 = req.files["file1"]?.[0]?.path;
        const file2 = req.files["file2"]?.[0]?.path;
        if (!file1 || !file2) return res.status(400).json({ error: "Both files required" });
        const result = await excelService.compareExcels(file1, file2);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Error comparing files: " + err.message });
    }
};
