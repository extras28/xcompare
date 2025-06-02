// Utility to read Excel file and return data as array of objects
const XLSX = require("xlsx");
const fs = require("fs");

exports.readExcel = async (filePath) => {
    const wb = XLSX.readFile(filePath);
    const ws = wb.Sheets[wb.SheetNames[0]];
    return XLSX.utils.sheet_to_json(ws);
};
