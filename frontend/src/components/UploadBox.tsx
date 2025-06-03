import React from "react";
import styled from "styled-components";
import { Card, Button } from "react-bootstrap";
import { DropZone } from "./DropZone";
import { FileList } from "./FileList";
import { useFileUpload } from "../hooks/useFileUpload";
import { useToast } from "../hooks/useToast";

interface UploadBoxProps {
    onFileSelect: (files: { file1: File; file2: File }) => void;
}

const UploadContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    min-height: 320px;
    padding: 2rem;
`;

const StyledCard = styled(Card)`
    background: var(--bs-tertiary-bg);
    border: 1px solid var(--bs-border-color);
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    max-width: 420px;
    width: 100%;
`;

const CardContent = styled(Card.Body)`
    padding: 32px 36px;
    text-align: center;
`;

const Title = styled.div`
    color: var(--bs-primary);
    font-weight: 600;
    font-size: 18px;
    margin-bottom: 24px;

    i {
        color: #388e3c;
        font-size: 28px;
        vertical-align: middle;
        margin-right: 0.5rem;
    }
`;

const CompareButton = styled(Button)`
    margin-top: 1.5rem;
    width: 100%;
    padding: 0.75rem;
    font-weight: 600;

    i {
        margin-right: 0.5rem;
    }
`;

export const UploadBox: React.FC<UploadBoxProps> = ({ onFileSelect }) => {
    const { showToast } = useToast();
    const { files, handleFileChange, removeFile, isFull } = useFileUpload({
        maxFiles: 2,
        maxSize: 50,
        onError: (message) => showToast(message),
    });

    const handleCompare = () => {
        if (files.length === 2) {
            onFileSelect({
                file1: files[0],
                file2: files[1],
            });
        }
    };

    return (
        <UploadContainer>
            <StyledCard>
                <CardContent>
                    <Title>
                        <i className="fa-solid fa-file-excel"></i>
                        Hãy tải lên <b>hai file Excel</b> để so sánh nội dung
                    </Title>

                    <DropZone onFilesAdded={handleFileChange} disabled={isFull} />

                    <FileList files={files} onRemove={removeFile} />

                    {files.length === 2 && (
                        <CompareButton variant="primary" onClick={handleCompare}>
                            <i className="fa-solid fa-code-compare"></i>
                            So sánh file Excel
                        </CompareButton>
                    )}
                </CardContent>
            </StyledCard>
        </UploadContainer>
    );
};
