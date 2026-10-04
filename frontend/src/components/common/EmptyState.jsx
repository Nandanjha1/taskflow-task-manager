import { FiInbox, FiSearch } from "react-icons/fi";

const EmptyState = ({ title = "No tasks found",
    description = "There are no tasks to display.",
    type = "default" }) => {

    const Icon = type === "search" ? FiSearch : FiInbox;

    return (
        <div className="flex min-h-[280px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 text-center dark:border-slate-700 dark:bg-slate-900">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                <Icon size={26} />
            </div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                {title}
            </h3>
            <p className="mt-1 max-w-md text-sm text-slate-500 dark:text-slate-400">
                {description}
            </p>
        </div>
    );
};

export default EmptyState;