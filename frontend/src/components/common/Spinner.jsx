const Spinner = ({ size = "md" }) => {
    const sizes = {
        sm: "h-4 w-4 border-2",
        md: "h-7 w-7 border-4",
        lg: "h-10 w-10 border-4",
    };
    return (
        <div className={`animate-spin rounded-full border-slate-200 border-t-indigo-600 ${sizes[size]}`} />
    );
};

export default Spinner;