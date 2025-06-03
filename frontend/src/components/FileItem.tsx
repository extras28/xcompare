import React from "react";
import styled from "styled-components";

const FileItemWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    background-color: var(--bs-tertiary-bg);
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid #388e3c;
`;

const FileNumber = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    background-color: #388e3c;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    font-size: 12px;
`;

const FileName = styled.span`
    flex-grow: 1;
    font-size: 14px;
    color: var(--bs-emphasis-color);
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: var(--bs-danger);
    padding: 0;
    margin-left: 8px;
    font-size: 14px;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }
`;

interface FileItemProps {
    file: File;
    index: number;
    onRemove: (index: number) => void;
}

export const FileItem: React.FC<FileItemProps> = ({ file, index, onRemove }) => {
    return (
        <FileItemWrapper>
            <FileNumber>{index + 1}</FileNumber>
            <FileName>{file.name}</FileName>
            <RemoveButton
                className="btn btn-link text-danger p-0"
                onClick={() => onRemove(index)}
                aria-label="Xóa file"
            >
                <i className="fa-solid fa-times"></i>
            </RemoveButton>
        </FileItemWrapper>
    );
};
