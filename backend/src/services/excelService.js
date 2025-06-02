// Service for comparing two Excel files
const { readExcel } = require("../utils/excelUtils");
const diffTool = require("../utils/diffTool");

exports.compareExcels = async (file1, file2) => {
    const data1 = await readExcel(file1);
    const data2 = await readExcel(file2);
    return diffTool(data1, data2);
};
