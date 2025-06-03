import React from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import { ExcelTable } from "./ExcelTable";
import { DiffList } from "./DiffList";

const ComparisonTableWrapper = styled.div`
    flex: 1;
    min-width: 0;

    .content-header {
        color: var(--bs-emphasis-color);
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 16px;
    }

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
        height: 100%;
    }

    .card-header {
        padding: 12px 16px;
        border-bottom: 1px solid var(--bs-border-color);
        font-weight: 600;

        &.bg-primary {
            background-color: var(--bs-primary) !important;
        }

        &.bg-success {
            background-color: var(--bs-success) !important;
        }
    }

    .card-body {
        padding: 8px;
        height: calc(100% - 49px); /* 49px is header height */
    }

    .excel-table-wrapper {
        height: 100%;
        max-height: 500px;
        overflow: hidden;
    }
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

const BackButton = styled(Button)`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;

    i {
        font-size: 1rem;
    }
`;

interface ComparisonResult {
    columns: string[];
    table1: Record<string, string>[];
    table2: Record<string, string>[];
    fileName1: string;
    fileName2: string;
    diffs: Array<{
        row: number;
        column: string;
        value1: string;
        value2: string;
    }>;
}

interface ComparisonTableProps {
    data: ComparisonResult;
    onReset: () => void;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ data, onReset }) => {
    const diffCells = React.useMemo(() => new Set(data.diffs.map((d) => `${d.row - 1},${d.column}`)), [data.diffs]);

    return (
        <ComparisonTableWrapper>
            <HeaderContainer>
                <div className="content-header">Kết quả so sánh</div>
                <BackButton variant="outline-primary" onClick={onReset}>
                    <i className="fa-solid fa-arrow-rotate-left"></i>
                    So sánh file khác
                </BackButton>
            </HeaderContainer>

            <DiffList diffs={data.diffs} />

            <div className="compare-row">
                <div className="compare-col">
                    <div className="card shadow-sm">
                        <div className="card-header bg-primary text-white">
                            <b>{data.fileName1}</b>
                        </div>
                        <div className="card-body">
                            <div className="excel-table-wrapper">
                                <ExcelTable columns={data.columns} data={data.table1} diffCells={diffCells} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="compare-col">
                    <div className="card shadow-sm">
                        <div className="card-header bg-success text-white">
                            <b>{data.fileName2}</b>
                        </div>
                        <div className="card-body">
                            <div className="excel-table-wrapper">
                                <ExcelTable columns={data.columns} data={data.table2} diffCells={diffCells} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ComparisonTableWrapper>
    );
};
