import React from "react";
import { ListGroup } from "react-bootstrap";
import styled from "styled-components";

interface FileListProps {
    files: File[];
    onRemove: (index: number) => void;
}

const StyledListGroup = styled(ListGroup)`
    max-height: 200px;
    overflow-y: auto;
    margin-top: 1rem;
`;

const FileItem = styled(ListGroup.Item)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;

    &:hover {
        opacity: 0.9;
        background-color: var(--bs-tertiary-bg);
    }
`;

const RemoveButton = styled.button`
    border: none;
    background: none;
    color: var(--bs-danger);
    padding: 0.25rem;
    cursor: pointer;

    &:hover {
        color: var(--bs-danger-dark);
    }
`;

const FileIcon = styled.i`
    margin-right: 0.5rem;
    color: #388e3c;
`;

export const FileList: React.FC<FileListProps> = ({ files, onRemove }) => {
    if (files.length === 0) return null;

    return (
        <StyledListGroup>
            {files.map((file, index) => (
                <FileItem key={`${file.name}-${index}`}>
                    <div>
                        <FileIcon className="fa-solid fa-file-excel" />
                        {file.name}
                    </div>
                    <RemoveButton onClick={() => onRemove(index)} aria-label={`Remove ${file.name}`}>
                        <i className="fa-solid fa-times" />
                    </RemoveButton>
                </FileItem>
            ))}
        </StyledListGroup>
    );
};
