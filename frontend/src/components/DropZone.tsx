import React from "react";
import styled from "styled-components";
import { FileUploader } from "react-drag-drop-files";

const DropZoneWrapper = styled.div<{ disabled: boolean }>`
    border: 2px dashed var(--bs-border-color);
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    background-color: var(--bs-body-bg);
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    transition: opacity 0.2s, border-color 0.2s;

    &:hover {
        border-color: ${(props) => !props.disabled && "var(--bs-primary)"};
    }
`;

const UploadIcon = styled.i`
    font-size: 24px;
    color: var(--bs-primary);
    margin-bottom: 8px;
`;

const DropMessage = styled.div`
    color: var(--bs-body-color);
    margin-bottom: 8px;
`;

const FileInfo = styled.div`
    font-size: 12px;
    color: var(--bs-secondary-color);
`;

interface DropZoneProps {
    onFilesAdded: (files: FileList) => void;
    disabled: boolean;
    maxFiles?: number;
}

export const DropZone: React.FC<DropZoneProps> = ({ onFilesAdded, disabled, maxFiles = 2 }) => {
    return (
        <FileUploader
            multiple={true}
            handleChange={onFilesAdded}
            name="file"
            types={["xlsx"]}
            maxSize={50}
            disabled={disabled}
            dropMessageStyle={{
                backgroundColor: "var(--bs-body-bg)",
                borderColor: "var(--bs-border-color)",
                color: "var(--bs-body-color)",
                fontSize: "14px",
                padding: "20px",
                borderRadius: "8px",
                opacity: disabled ? 0.5 : 1,
            }}
        >
            <DropZoneWrapper disabled={disabled}>
                <UploadIcon className="fa-solid fa-cloud-arrow-up" />
                <DropMessage>Kéo thả file vào đây hoặc click để chọn file</DropMessage>
                <FileInfo>
                    {disabled ? "Đã chọn đủ file Excel" : `Còn cần chọn file Excel (.xlsx) - Tối đa 50MB mỗi file`}
                </FileInfo>
            </DropZoneWrapper>
        </FileUploader>
    );
};
