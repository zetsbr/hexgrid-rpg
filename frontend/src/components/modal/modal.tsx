import React from "react";
import "./baseModal.css";

interface BaseModalProps {
    isOpen: boolean;
    onClose?: () => void;
    children: React.ReactNode;
}

export default function BaseModal({
    isOpen,
    onClose,
    children,
}: BaseModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="modal-container"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}
