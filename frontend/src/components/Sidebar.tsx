import React from "react";
import styled from "styled-components";
import { useClickOutside } from "../hooks/useClickOutside";

const SidebarWrapper = styled.aside<{ isVisible: boolean; isOverlay: boolean }>`
    min-width: ${(props) => (props.isOverlay ? "80vw" : "180px")};
    max-width: ${(props) => (props.isOverlay ? "90vw" : "220px")};
    width: ${(props) => (props.isOverlay ? "80vw" : "auto")};
    background: var(--bs-tertiary-bg);
    // border-right: 1.5px solid var(--bs-border-color);
    box-shadow: ${(props) =>
        props.isOverlay ? "2px 0 16px rgba(25, 118, 210, 0.12)" : "2px 0 8px rgba(25, 118, 210, 0.04)"};
    height: 100vh;
    overflow: hidden;
    font-size: 13px;
    position: ${(props) => (props.isOverlay ? "fixed" : "relative")};
    left: 0;
    top: 0;
    z-index: ${(props) => (props.isOverlay ? 2000 : 2)};
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
    transform: translateX(${(props) => (props.isVisible ? "0" : "-100%")});
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.18);
    backdrop-filter: blur(2px);
    z-index: 1999;
    transition: opacity 0.3s ease;
`;

const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    border-bottom: 1px solid var(--bs-border-color);
    min-height: 48px;

    span {
        font-weight: 600;
        color: var(--bs-emphasis-color);
    }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: var(--bs-emphasis-color);
    font-size: 1.5rem;
    cursor: pointer;
    padding: 2px 8px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: var(--bs-tertiary-bg);
    }

    i {
        font-size: 18px;
    }
`;

const SidebarContent = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    overflow-y: auto;
`;

const DevelopmentMessage = styled.div`
    background: var(--bs-secondary-bg);
    border: 1px solid var(--bs-border-color);
    border-radius: 8px;
    padding: 32px 24px;
    text-align: center;
    color: var(--bs-secondary-color);
    font-size: 15px;
    max-width: 260px;
    width: 100%;

    i {
        font-size: 32px;
        margin-bottom: 12px;
        color: var(--bs-primary);
    }
`;

interface SidebarProps {
    isVisible: boolean;
    onToggle: () => void;
    overlayMode?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isVisible, onToggle, overlayMode = false }) => {
    const sidebarRef = useClickOutside<HTMLDivElement>(() => {
        if (overlayMode && isVisible) {
            onToggle();
        }
    });

    return (
        <>
            {overlayMode && isVisible && <Overlay onClick={onToggle} />}
            <SidebarWrapper ref={sidebarRef} isVisible={isVisible} isOverlay={overlayMode}>
                <SidebarHeader>
                    <span>Công cụ</span>
                    {overlayMode && (
                        <CloseButton aria-label="Ẩn sidebar" title="Ẩn sidebar" onClick={onToggle}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </CloseButton>
                    )}
                </SidebarHeader>

                <SidebarContent>
                    <DevelopmentMessage>
                        <i className="fa-solid fa-hammer" />
                        <div>Tính năng đang được phát triển</div>
                    </DevelopmentMessage>
                </SidebarContent>
            </SidebarWrapper>
        </>
    );
};
