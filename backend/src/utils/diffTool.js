// Simple diff tool for comparing two arrays of objects
module.exports = (data1, data2) => {
    if (!Array.isArray(data1) || !Array.isArray(data2)) return { error: "Invalid data" };
    if (data1.length !== data2.length) return { error: `Row count differs: ${data1.length} vs ${data2.length}` };
    let diffs = [];
    for (let i = 0; i < data1.length; i++) {
        const row1 = data1[i];
        const row2 = data2[i];
        const keys = Array.from(new Set([...Object.keys(row1), ...Object.keys(row2)]));
        for (const key of keys) {
            const val1 = row1[key] ?? "";
            const val2 = row2[key] ?? "";
            if (val1 !== val2) {
                diffs.push({
                    row: i + 1,
                    column: key,
                    value1: val1,
                    value2: val2,
                });
            }
        }
    }
    return { diffs };
};
