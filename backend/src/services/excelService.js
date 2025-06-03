// Service for comparing two Excel files
const { readExcel } = require("../utils/excelUtils");
const diffTool = require("../utils/diffTool");

exports.compareExcels = async (buffer1, buffer2, fileName1, fileName2) => {
    try {
        // Read and parse both Excel files
        const table1 = await readExcel(buffer1);
        const table2 = await readExcel(buffer2);

        // Get all unique columns from both tables
        const columns = Array.from(new Set([...Object.keys(table1[0] || {}), ...Object.keys(table2[0] || {})])).sort();

        // Use diffTool to find differences
        const { error, diffs } = diffTool(table1, table2);

        if (error) {
            throw new Error(error);
        }

        return {
            columns,
            table1,
            table2,
            fileName1,
            fileName2,
            diffs,
        };
    } catch (error) {
        throw new Error(`Error comparing Excel files: ${error.message}`);
    }
};
