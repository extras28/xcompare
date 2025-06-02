// Service for comparing two Excel files
const { readExcel } = require("../utils/excelUtils");
const diffTool = require("../utils/diffTool");

exports.compareExcels = async (file1, file2) => {
    const data1 = await readExcel(file1);
    const data2 = await readExcel(file2);
    // Nếu số dòng khác nhau, trả về lỗi rõ ràng
    if (!Array.isArray(data1) || !Array.isArray(data2)) return { error: "Invalid data" };
    if (data1.length !== data2.length) return { error: `Row count differs: ${data1.length} vs ${data2.length}` };
    // Lấy tất cả các cột xuất hiện ở cả hai file
    const allColumns = Array.from(
        new Set([...data1.flatMap((row) => Object.keys(row)), ...data2.flatMap((row) => Object.keys(row))])
    );
    // Chuẩn hóa dữ liệu: nếu thiếu cột thì thêm giá trị rỗng
    const norm = (row) => {
        let r = {};
        for (const col of allColumns) r[col] = row[col] ?? "";
        return r;
    };
    const table1 = data1.map(norm);
    const table2 = data2.map(norm);
    // Tìm các cell khác biệt
    let diffs = [];
    for (let i = 0; i < table1.length; i++) {
        for (const col of allColumns) {
            if (table1[i][col] !== table2[i][col]) {
                diffs.push({
                    row: i + 1,
                    column: col,
                    value1: table1[i][col],
                    value2: table2[i][col],
                });
            }
        }
    }
    return { table1, table2, columns: allColumns, diffs };
};
