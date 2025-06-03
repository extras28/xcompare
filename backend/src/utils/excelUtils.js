// Utility to read Excel file and return data as array of objects
const XLSX = require("xlsx");

exports.readExcel = async (buffer) => {
    const wb = XLSX.read(buffer, { type: "buffer" });
    const ws = wb.Sheets[wb.SheetNames[0]];
    return XLSX.utils.sheet_to_json(ws, {
        raw: false, // Convert all data to strings
        defval: "", // Use empty string for empty cells
    });
};
