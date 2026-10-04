const StatsCard = ({ title, value, icon, description }) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500">
                        {title}
                    </p>
                    <h3 className="mt-2 text-3xl font-bold text-slate-900">
                        {value}
                    </h3>
                </div>
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    {icon}
                </div>
            </div>
            {description && (
                <p className="mt-3 text-xs text-slate-500">
                    {description}
                </p>
            )}
        </div>
    );
};

export default StatsCard;