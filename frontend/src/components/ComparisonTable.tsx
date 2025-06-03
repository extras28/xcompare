import React from "react";
import styled from "styled-components";

const ComparisonTableWrapper = styled.div`
    flex: 1;
    min-width: 0;

    .compare-row {
        display: flex;
        gap: 20px;
        flex-direction: row;

        @media (max-width: 992px) {
            flex-direction: column;
        }
    }

    .compare-col {
        flex: 1;
        min-width: 0;
    }

    .card {
        background-color: var(--bs-tertiary-bg);
        border: 1px solid var(--bs-border-color);
    }

    .excel-table-wrapper {
        max-height: 500px;
        overflow: auto;
        background-color: var(--bs-tertiary-bg);
    }

    .excel-table {
        border-collapse: collapse;
        font-size: 13px;
        width: 100%;
    }

    .excel-table th,
    .excel-table td {
        border: 1px solid var(--bs-border-color);
        padding: 4px 8px;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .excel-table thead th {
        background-color: var(--bs-secondary-bg);
        font-weight: 600;
        color: var(--bs-emphasis-color);
        position: sticky;
        top: 0;
        z-index: 1;
    }

    .diff-cell {
        position: relative;
    }

    [data-bs-theme="light"] {
        .card-header.bg-primary {
            background-color: var(--bs-primary) !important;
        }

        .card-header.bg-success {
            background-color: var(--bs-success) !important;
        }

        .diff-cell {
            background-color: #ffebee;
            color: #c62828;
        }

        .excel-table td {
            color: var(--bs-body-color);
        }
    }

    [data-bs-theme="dark"] {
        .card-header.bg-primary {
            background-color: var(--bs-primary) !important;
        }

        .card-header.bg-success {
            background-color: var(--bs-success) !important;
        }

        .diff-cell {
            background-color: #311b1b;
            color: #ff8a80;
        }

        .excel-table td {
            color: var(--bs-body-color);
        }
    }

    .content-header {
        color: var(--bs-emphasis-color);
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 16px;
    }
`;

interface ComparisonResult {
    columns: string[];
    table1: Record<string, string>[];
    table2: Record<string, string>[];
    fileName1: string;
    fileName2: string;
    diffs: {
        row: number;
        column: string;
        value1: string;
        value2: string;
    }[];
}

interface ComparisonTableProps {
    data: ComparisonResult;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ data }) => {
    const diffCells = new Set(data.diffs.map((d) => `${d.row - 1},${d.column}`));

    return (
        <ComparisonTableWrapper>
            <div className="content-header">Kết quả so sánh</div>
            <div className="mt-2">
                <b>Chi tiết các ô khác nhau:</b>
            </div>
            <ul style={{ fontSize: "13px" }}>
                {data.diffs.map((d, i) => (
                    <li key={i}>
                        Dòng {d.row}, cột '{d.column}': File 1 = '{d.value1}', File 2 = '{d.value2}'
                    </li>
                ))}
            </ul>

            <div className="compare-row mt-3">
                <div className="compare-col">
                    <div className="card shadow-sm mb-3">
                        <div className="card-header bg-primary text-white">
                            <b>{data.fileName1}</b>
                        </div>
                        <div className="card-body p-2 excel-table-wrapper">
                            <table className="excel-table w-100">
                                <thead>
                                    <tr>
                                        {data.columns.map((col) => (
                                            <th key={col}>{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.table1.map((row, rowIdx) => (
                                        <tr key={rowIdx}>
                                            {data.columns.map((col) => {
                                                const isDiff = diffCells.has(`${rowIdx},${col}`);
                                                return (
                                                    <td
                                                        key={col}
                                                        className={isDiff ? "diff-cell" : ""}
                                                        title={row[col]}
                                                    >
                                                        {row[col]}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="compare-col">
                    <div className="card shadow-sm mb-3">
                        <div className="card-header bg-success text-white">
                            <b>{data.fileName2}</b>
                        </div>
                        <div className="card-body p-2 excel-table-wrapper">
                            <table className="excel-table w-100">
                                <thead>
                                    <tr>
                                        {data.columns.map((col) => (
                                            <th key={col}>{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.table2.map((row, rowIdx) => (
                                        <tr key={rowIdx}>
                                            {data.columns.map((col) => {
                                                const isDiff = diffCells.has(`${rowIdx},${col}`);
                                                return (
                                                    <td
                                                        key={col}
                                                        className={isDiff ? "diff-cell" : ""}
                                                        title={row[col]}
                                                    >
                                                        {row[col]}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </ComparisonTableWrapper>
    );
};
