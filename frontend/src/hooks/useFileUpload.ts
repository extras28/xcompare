import { useState } from "react";

interface UseFileUploadProps {
    maxFiles?: number;
    maxSize?: number;
    allowedTypes?: string[];
    onError?: (message: string) => void;
}

export const useFileUpload = ({
    maxFiles = 2,
    maxSize = 50,
    allowedTypes = ["xlsx"],
    onError,
}: UseFileUploadProps = {}) => {
    const [files, setFiles] = useState<File[]>([]);

    const handleFileChange = (uploadedFiles: FileList) => {
        const newFiles = Array.from(uploadedFiles);

        // Check file type
        const invalidFiles = newFiles.filter(
            (file) => !allowedTypes.some((type) => file.name.toLowerCase().endsWith(`.${type}`))
        );

        if (invalidFiles.length > 0) {
            onError?.(`Only ${allowedTypes.join(", ")} files are allowed`);
            return;
        }

        // Update file list
        const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);
        setFiles(updatedFiles);
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const clearFiles = () => {
        setFiles([]);
    };

    return {
        files,
        handleFileChange,
        removeFile,
        clearFiles,
        isFull: files.length >= maxFiles,
    };
};
