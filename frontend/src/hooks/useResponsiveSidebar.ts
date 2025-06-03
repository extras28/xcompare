import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 992;

export const useResponsiveSidebar = () => {
    const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth >= MOBILE_BREAKPOINT);
    const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            const newIsMobile = width < MOBILE_BREAKPOINT;
            setIsMobile(newIsMobile);

            if (newIsMobile) {
                setSidebarVisible(false);
            } else {
                setSidebarVisible(true);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

    return {
        sidebarVisible,
        toggleSidebar,
        isMobile,
    };
};
