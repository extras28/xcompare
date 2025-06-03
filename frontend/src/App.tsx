import { useState } from "react";
import styled from "styled-components";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { ComparisonTable } from "./components/ComparisonTable";
import { Toast } from "./components/Toast";
import { UploadBox } from "./components/UploadBox";
import { compareFiles } from "./services/api";
import { GlobalStyles } from "./styles/GlobalStyles";
import { useToast } from "./hooks/useToast";
import { useTheme } from "./hooks/useTheme";
import { useResponsiveSidebar } from "./hooks/useResponsiveSidebar";

// Styled Components
const AppContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: var(--bs-body-bg);
`;

const MainContent = styled.div<{ isBlurred: boolean; sidebarVisible: boolean; isMobile: boolean }>`
    display: flex;
    flex-direction: column;
    height: 100vh;
    min-width: 0;
    flex: 1;
    background: var(--bs-body-bg);
    filter: ${(props) => (props.isBlurred ? "blur(2px) grayscale(0.2)" : "none")};
    pointer-events: ${(props) => (props.isBlurred ? "none" : "auto")};
    padding-left: ${(props) => (!props.isMobile && props.sidebarVisible ? "280px" : "0")};
    width: 100%;
    transition: padding-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    main {
        padding: 24px;
        @media (max-width: 768px) {
            padding: 16px;
        }
    }
`;

const LoadingSpinner = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;

    i {
        color: var(--bs-primary);
    }
`;

function App() {
    // Custom Hooks
    const { toasts, showToast, removeToast } = useToast();
    const { isDarkMode, toggleTheme } = useTheme();
    const { sidebarVisible, toggleSidebar, isMobile } = useResponsiveSidebar();

    // State
    const [comparisonData, setComparisonData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Handlers
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

    const handleReset = () => {
        setComparisonData(null);
    };

    // Render helpers
    const renderMainContent = () => {
        if (isLoading) {
            return (
                <LoadingSpinner>
                    <i className="fa-solid fa-spinner fa-spin fa-2x"></i>
                </LoadingSpinner>
            );
        }

        if (comparisonData) {
            return <ComparisonTable data={comparisonData} onReset={handleReset} />;
        }

        return <UploadBox onFileSelect={handleFileSelect} />;
    };

    return (
        <AppContainer>
            <GlobalStyles />
            <Toast toasts={toasts} onClose={removeToast} />

            <Sidebar isVisible={sidebarVisible} onToggle={toggleSidebar} overlayMode={isMobile} />

            <MainContent isBlurred={sidebarVisible && isMobile} sidebarVisible={sidebarVisible} isMobile={isMobile}>
                <Header
                    onToggleSidebar={toggleSidebar}
                    onToggleTheme={toggleTheme}
                    isDarkMode={isDarkMode}
                    isSidebarVisible={sidebarVisible}
                />

                <main className="flex-grow-1 d-flex flex-column">{renderMainContent()}</main>
            </MainContent>
        </AppContainer>
    );
}

export default App;
