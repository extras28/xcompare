import React from "react";
import styled from "styled-components";

const ToastContainer = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1060;
`;

const ToastItem = styled.div`
    background: var(--bs-danger);
    color: white;
    padding: 15px 25px;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 10px;
    transform: translateX(120%);
    opacity: 0;
    transition: transform 0.3s ease-out, opacity 0.2s ease-in;
    font-size: 13px;

    &.show {
        transform: translateX(0);
        opacity: 1;
    }

    i {
        font-size: 18px;
        color: #fff;
    }

    button {
        background: none;
        border: none;
        color: white;
        margin-left: auto;
        padding: 0 5px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.2s, transform 0.2s;

        &:hover {
            opacity: 1;
            transform: scale(1.1);
        }
    }
`;

interface Toast {
    id: string;
    message: string;
}

interface ToastProps {
    toasts: Toast[];
    onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onClose }) => {
    return (
        <ToastContainer>
            {toasts.map((toast) => (
                <ToastItem key={toast.id} className="toast show">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    <span>{toast.message}</span>
                    <button onClick={() => onClose(toast.id)}>&times;</button>
                </ToastItem>
            ))}
        </ToastContainer>
    );
};
