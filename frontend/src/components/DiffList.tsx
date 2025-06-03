import React from "react";
import styled from "styled-components";

const DiffListWrapper = styled.div`
    margin-bottom: 24px;

    .diff-header {
        font-weight: 600;
        margin-bottom: 8px;
        color: var(--bs-emphasis-color);
    }

    ul {
        font-size: 13px;
        margin: 0;
        padding-left: 20px;
        color: var(--bs-body-color);
    }

    li {
        margin-bottom: 4px;
    }
`;

interface DiffListProps {
    diffs: Array<{
        row: number;
        column: string;
        value1: string;
        value2: string;
    }>;
}

export const DiffList: React.FC<DiffListProps> = ({ diffs }) => {
    return (
        <DiffListWrapper>
            <div className="diff-header">Chi tiết các ô khác nhau:</div>
            <ul>
                {diffs.map((d, i) => (
                    <li key={i}>
                        Dòng {d.row}, cột '{d.column}': File 1 = '{d.value1}', File 2 = '{d.value2}'
                    </li>
                ))}
            </ul>
        </DiffListWrapper>
    );
};
