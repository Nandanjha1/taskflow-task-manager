import { FiCalendar, FiEdit2, FiGrid, FiTrash2 } from "react-icons/fi";
import { FiArrowRight, FiCheck, FiRotateCcw } from "react-icons/fi";
import { formatDate, isOverdue } from "../../utils/helpers";

const priorityStyles = {
    high: "bg-red-50 text-red-600",
    medium: "bg-yellow-50 text-yellow-600",
    low: "bg-green-50 text-green-600",
};

const TaskCard = ({ task, onEdit, onDelete, onStatusChange, onDragStart, onDragEnd }) => {

    const overdue = isOverdue(task);

    const handleDragStart = (event) => {
        event.dataTransfer.setData("taskId", task.id);
        event.dataTransfer.effectAllowed = "move";
        onDragStart?.(task);
    };

    const handleDragEnd = () => {
        onDragEnd?.();
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="group cursor-grab rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing duration-200 dark:border-slate-700 dark:bg-slate-900"
        >
            {/* Header */}
            <div className="flex items-start gap-3">
                <div className="mt-1 text-slate-300 transition group-hover:text-slate-500">
                    <FiGrid size={18} />
                </div>
                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-slate-800">
                            {task.title}
                        </h3>
                        <span className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium
                            ${priorityStyles[task.priority]}`}>
                            {task.priority}
                        </span>
                    </div>
                    {/* Description */}
                    {task.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                            {task.description}
                        </p>
                    )}
                </div>
            </div>
            {/* Metadata */}
            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-slate-500">
                    <FiCalendar size={14} />
                    {formatDate(task.dueDate)}
                </div>
                {overdue && (
                    <span className="rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-600">
                        Overdue
                    </span>
                )}
            </div>
            {/* Actions */}
            <div className="mt-4 flex items-center justify-between border-t pt-3">
                {task.status === "todo" && (
                    <button
                        type="button"
                        onClick={() =>
                            onStatusChange(task.id, "in-progress")}
                        className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline">
                        <FiArrowRight size={14} />
                        Start
                    </button>
                )}
                {task.status === "in-progress" && (
                    <button
                        type="button"
                        onClick={() =>
                            onStatusChange(task.id, "completed")
                        }
                        className="flex items-center gap-1 text-xs font-medium text-green-600 hover:underline">
                        <FiCheck size={14} />
                        Complete
                    </button>
                )}
                {task.status === "completed" && (
                    <button
                        type="button"
                        onClick={() =>
                            onStatusChange(task.id, "todo")
                        }
                        className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:underline">
                        <FiRotateCcw size={14} />
                        Reopen
                    </button>
                )}
                <div className="flex gap-1">
                    <button
                        type="button"
                        onClick={() => onEdit(task)}
                        className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                        aria-label="Edit task"
                    >
                        <FiEdit2 size={16} />
                    </button>
                    <button
                        type="button"
                        onClick={() => onDelete(task.id)}
                        className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                        aria-label={`Delete ${task.title}`}
                        title="Delete task"
                    >
                        <FiTrash2 size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;