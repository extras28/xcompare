import type { FC } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";

interface UploadBoxProps {
    onFileSelect: (files: { file1: File; file2: File }) => void;
    showToast: (message: string) => void;
}

export const UploadBox: FC<UploadBoxProps> = ({ onFileSelect, showToast }) => {
    const fileTypes = ["xlsx"];
    const [files, setFiles] = useState<File[]>([]);

    const handleChange = (uploadedFiles: FileList) => {
        const newFiles = Array.from(uploadedFiles);

        // Kiểm tra định dạng file
        const invalidFiles = newFiles.filter((file) => !file.name.toLowerCase().endsWith(".xlsx"));
        if (invalidFiles.length > 0) {
            showToast("Chỉ chấp nhận file Excel định dạng .xlsx");
            return;
        }

        // Cập nhật danh sách file
        const updatedFiles = [...files, ...newFiles].slice(0, 2);
        setFiles(updatedFiles);
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleCompare = () => {
        if (files.length === 2) {
            onFileSelect({
                file1: files[0],
                file2: files[1],
            });
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center flex-grow-1" style={{ minHeight: 320 }}>
            <div
                className="message shadow-sm"
                style={{
                    background: "var(--bs-tertiary-bg)",
                    color: "var(--bs-primary)",
                    fontWeight: 600,
                    border: "1px solid var(--bs-border-color)",
                    borderRadius: 12,
                    fontSize: 18,
                    padding: "32px 36px",
                    textAlign: "center",
                    maxWidth: 420,
                    boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
                }}
            >
                <i
                    className="fa-solid fa-file-excel me-2"
                    style={{ color: "#388e3c", fontSize: 28, verticalAlign: "middle" }}
                ></i>
                <div style={{ marginTop: 12, marginBottom: 24 }}>
                    Hãy tải lên <b>hai file Excel</b> để so sánh nội dung
                </div>

                <FileUploader
                    multiple={true}
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                    maxSize={50}
                    disabled={files.length >= 2}
                    dropMessageStyle={{
                        backgroundColor: "var(--bs-body-bg)",
                        borderColor: "var(--bs-border-color)",
                        color: "var(--bs-body-color)",
                        fontSize: "14px",
                        padding: "20px",
                        borderRadius: "8px",
                        opacity: files.length >= 2 ? 0.5 : 1,
                    }}
                >
                    <div
                        style={{
                            border: "2px dashed var(--bs-border-color)",
                            borderRadius: "8px",
                            padding: "20px",
                            textAlign: "center",
                            cursor: files.length >= 2 ? "not-allowed" : "pointer",
                            backgroundColor: "var(--bs-body-bg)",
                            opacity: files.length >= 2 ? 0.5 : 1,
                        }}
                    >
                        <i className="fa-solid fa-cloud-arrow-up mb-2" style={{ fontSize: "24px" }}></i>
                        <div>Kéo thả file vào đây hoặc click để chọn file</div>
                        <div style={{ fontSize: "12px", color: "var(--bs-secondary)", marginTop: "8px" }}>
                            {files.length === 2
                                ? "Đã chọn đủ 2 file Excel"
                                : `Còn cần chọn ${2 - files.length} file Excel (.xlsx) - Tối đa 50MB mỗi file`}
                        </div>
                    </div>
                </FileUploader>

                {files.length > 0 && (
                    <div className="mt-4" style={{ textAlign: "left" }}>
                        <div style={{ fontSize: "14px", marginBottom: "10px", color: "var(--bs-emphasis-color)" }}>
                            File đã chọn:
                        </div>
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="d-flex align-items-center mb-2"
                                style={{
                                    backgroundColor: "var(--bs-tertiary-bg)",
                                    padding: "8px 12px",
                                    borderRadius: "6px",
                                    border: "1px solid #388e3c",
                                }}
                            >
                                <div
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        borderRadius: "12px",
                                        backgroundColor: "#388e3c",
                                        color: "white",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginRight: "8px",
                                        fontSize: "12px",
                                    }}
                                >
                                    {index + 1}
                                </div>
                                <span
                                    className="flex-grow-1"
                                    style={{ fontSize: "14px", color: "var(--bs-emphasis-color)" }}
                                >
                                    {file.name}
                                </span>
                                <button
                                    className="btn btn-link text-danger p-0 ms-2"
                                    onClick={() => removeFile(index)}
                                    style={{ fontSize: "14px" }}
                                >
                                    <i className="fa-solid fa-times"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <button className="btn btn-primary w-100 mt-4" onClick={handleCompare} disabled={files.length !== 2}>
                    <i className="fa-solid fa-arrow-right-arrow-left me-2"></i>
                    So sánh
                </button>
            </div>
        </div>
    );
};
