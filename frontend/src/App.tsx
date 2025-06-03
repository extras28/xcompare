import { useState, useEffect } from "react";
import styled from "styled-components";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { ComparisonTable } from "./components/ComparisonTable";
import { Toast } from "./components/Toast";
import { UploadBox } from "./components/UploadBox";
import { compareFiles } from "./services/api";
import { GlobalStyles } from "./styles/GlobalStyles";

const AppContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: var(--bs-body-bg);
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-width: 0;
    flex: 1 1 0%;
    background: var(--bs-body-bg);

    main {
        padding: 24px;
        @media (max-width: 768px) {
            padding: 16px;
        }
    }
`;

interface Toast {
    id: string;
    message: string;
}

function App() {
    const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 992);
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("theme") === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches
    );
    const [comparisonData, setComparisonData] = useState(null);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", isDarkMode ? "dark" : "light");
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);

    // Responsive: ẩn sidebar khi resize nhỏ hơn 992px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 992) {
                setSidebarVisible(false);
            } else {
                setSidebarVisible(true);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const showToast = (message: string) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, message }]);
        setTimeout(() => {
            removeToast(id);
        }, 5000);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const handleFileSelect = async (files: { file1: File; file2: File }) => {
        setIsLoading(true);
        try {
            const result = await compareFiles(files.file1, files.file2);
            setComparisonData(result);
        } catch (error) {
            showToast(error instanceof Error ? error.message : "Error comparing files");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppContainer>
            <GlobalStyles />
            <Toast toasts={toasts} onClose={removeToast} />

            <Sidebar
                isVisible={sidebarVisible}
                onToggle={() => setSidebarVisible(!sidebarVisible)}
                overlayMode={window.innerWidth < 992}
            />

            <MainContent
                style={{
                    filter: sidebarVisible && window.innerWidth < 992 ? "blur(2px) grayscale(0.2)" : undefined,
                    pointerEvents: sidebarVisible && window.innerWidth < 992 ? "none" : undefined,
                }}
            >
                <Header
                    onToggleSidebar={() => setSidebarVisible(!sidebarVisible)}
                    onToggleTheme={() => setIsDarkMode(!isDarkMode)}
                    isDarkMode={isDarkMode}
                    isSidebarVisible={sidebarVisible}
                />

                <main className="flex-grow-1 d-flex flex-column">
                    {isLoading ? (
                        <div className="d-flex justify-content-center align-items-center h-100">
                            <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                        </div>
                    ) : comparisonData ? (
                        <ComparisonTable data={comparisonData} />
                    ) : (
                        <UploadBox onFileSelect={handleFileSelect} showToast={showToast} />
                    )}
                </main>
            </MainContent>
        </AppContainer>
    );
}

export default App;
