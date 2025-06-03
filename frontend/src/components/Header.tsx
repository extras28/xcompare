import React from "react";
import styled from "styled-components";

const HeaderWrapper = styled.div`
    width: 100%;
    background: var(--bs-primary);
    color: var(--bs-light);
    font-size: 1.1rem;
    font-weight: 600;
    padding: 10px 16px;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--bs-primary-border-subtle);
    position: relative;
    z-index: 3;
    min-height: 48px;
`;

const SidebarButton = styled.button`
    background: none;
    border: none;
    padding: 2px 6px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: none;
    outline: none;
    i {
        font-size: 1.3rem;
        color: inherit;
        transition: color 0.2s, transform 0.2s;
    }
`;

const ThemeButton = styled.button`
    background: none;
    border: none;
    padding: 2px 6px;
    margin-right: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: none;
    outline: none;
    &:hover i,
    &:focus i {
        color: #ffd600;
        transform: scale(1.18) rotate(-8deg);
        transition: color 0.2s, transform 0.2s;
    }
    &:active i {
        color: #ff9100;
        transform: scale(0.95) rotate(0deg);
    }
    i {
        font-size: 1.3rem;
        color: inherit;
        transition: color 0.2s, transform 0.2s;
    }
`;

interface HeaderProps {
    onToggleSidebar: () => void;
    onToggleTheme: () => void;
    isDarkMode: boolean;
    isSidebarVisible: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onToggleTheme, isDarkMode, isSidebarVisible }) => {
    return (
        <HeaderWrapper className="header-bar">
            <SidebarButton
                id="sidebar-toggle-btn"
                className="sidebar-toggle-btn"
                type="button"
                onClick={onToggleSidebar}
                title="Ẩn/hiện thanh công cụ"
            >
                <i className={`fa-solid ${isSidebarVisible ? "fa-bars" : "fa-bars-staggered"}`}></i>
            </SidebarButton>
            <span>So sánh file Excel</span>
            <ThemeButton
                id="theme-toggle-btn"
                className="theme-toggle-btn"
                type="button"
                onClick={onToggleTheme}
                title={isDarkMode ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
            >
                <i className={`fa-solid ${isDarkMode ? "fa-sun" : "fa-moon"}`}></i>
            </ThemeButton>
        </HeaderWrapper>
    );
};
