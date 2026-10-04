import { createContext, useCallback, useContext, useState } from "react";
import { FiCheckCircle, FiInfo, FiAlertTriangle, FiXCircle } from "react-icons/fi";
const ToastContext = createContext(null);
const TOAST_DURATION = 3000;

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const removeToast = useCallback((id) => {
        setToasts((previous) =>
            previous.filter(
                (toast) =>
                    toast.id !== id
            )
        );
    }, []
    );

    const showToast = useCallback(
        (
            message,
            type = "success"
        ) => {
            const id =
                crypto.randomUUID();

            setToasts((previous) => [
                ...previous,
                {
                    id,
                    message,
                    type,
                },
            ]);
            setTimeout(() => {
                removeToast(id);
            }, TOAST_DURATION);
        },
        [removeToast]
    );

    const value = { showToast, removeToast };

    return (
        <ToastContext.Provider value={value} >
            {children}
            {/* Toast Container */}
            <div className="fixed right-4 top-20 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3">
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

const ToastItem = ({ toast, onClose }) => {
    const config = {
        success: {
            icon: (
                <FiCheckCircle size={20} />
            ),
            classes:
                "border-green-200 bg-green-50 text-green-700",
        },
        error: {
            icon: (
                <FiXCircle size={20} />
            ),
            classes:
                "border-red-200 bg-red-50 text-red-700",
        },
        warning: {
            icon: (
                <FiAlertTriangle size={20} />
            ),
            classes:
                "border-yellow-200 bg-yellow-50 text-yellow-700",
        },
        info: {
            icon: (
                <FiInfo size={20} />
            ),
            classes:
                "border-blue-200 bg-blue-50 text-blue-700",
        },
    };
    const current = config[toast.type] || config.info;

    return (
        <div
            className={`
                flex
                items-start
                gap-3
                rounded-xl
                border
                px-4
                py-3
                shadow-lg
                ${current.classes}
            `}
        >
            {current.icon}
            <p className="flex-1 text-sm font-medium">
                {toast.message}
            </p>
            <button
                type="button"
                onClick={onClose}
                className="text-current opacity-60 transition  hover:opacity-100"
            >
                ×
            </button>
        </div>
    );
};

export const useToast = () => {
    const context =
        useContext(ToastContext);
    if (!context) {
        throw new Error(
            "useToast must be used inside ToastProvider"
        );
    }

    return context;
};