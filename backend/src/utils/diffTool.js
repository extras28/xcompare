// Simple diff tool for comparing two arrays of objects
module.exports = (data1, data2) => {
    if (!Array.isArray(data1) || !Array.isArray(data2)) return "Invalid data";
    if (data1.length !== data2.length) return `Row count differs: ${data1.length} vs ${data2.length}`;
    let diffs = [];
    for (let i = 0; i < data1.length; i++) {
        const row1 = JSON.stringify(data1[i]);
        const row2 = JSON.stringify(data2[i]);
        if (row1 !== row2) diffs.push(`Row ${i + 1} differs:\n${row1}\nvs\n${row2}`);
    }
    return diffs.length ? diffs.join("\n\n") : "No differences found.";
};
