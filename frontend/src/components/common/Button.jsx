const variants = {
    primary:
        "bg-indigo-600 text-white hover:bg-indigo-700",
    secondary:
        "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700",
    danger:
        "bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950 dark:text-red-400 dark:hover:bg-red-900",
    ghost:
        "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
};

const Button = ({ children, variant = "primary", className = "", type = "button", ...props }) => {
    return (
        <button type={type} className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50
        ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button;