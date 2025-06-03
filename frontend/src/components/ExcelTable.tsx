import React from "react";
import styled from "styled-components";

const TableWrapper = styled.div`
    overflow: auto;
    background-color: var(--bs-tertiary-bg);
    height: 100%;

    table {
        border-collapse: collapse;
        font-size: 13px;
        width: 100%;
    }

    th,
    td {
        border: 1px solid var(--bs-border-color);
        padding: 4px 8px;
        max-width: 200px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    thead th {
        background-color: var(--bs-secondary-bg);
        font-weight: 600;
        color: var(--bs-emphasis-color);
        position: sticky;
        top: 0;
        z-index: 1;
    }

    td {
        color: var(--bs-body-color);
    }

    .diff-cell {
        position: relative;
        background-color: ${(props) => (props.theme.mode === "light" ? "#ffebee" : "#311b1b")};
        color: ${(props) => (props.theme.mode === "light" ? "#c62828" : "#ff8a80")};
    }
`;

interface ExcelTableProps {
    columns: string[];
    data: Record<string, string>[];
    diffCells: Set<string>;
}

export const ExcelTable: React.FC<ExcelTableProps> = ({ columns, data, diffCells }) => {
    return (
        <TableWrapper>
            <table className="excel-table w-100">
                <thead>
                    <tr>
                        {columns.map((col) => (
                            <th key={col}>{col}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIdx) => (
                        <tr key={rowIdx}>
                            {columns.map((col) => {
                                const isDiff = diffCells.has(`${rowIdx},${col}`);
                                return (
                                    <td key={col} className={isDiff ? "diff-cell" : ""} title={row[col]}>
                                        {row[col]}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </TableWrapper>
    );
};
