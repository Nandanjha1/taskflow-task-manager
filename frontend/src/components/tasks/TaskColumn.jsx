import { useState } from "react";
import TaskCard from "./TaskCard";
import EmptyState from "../common/EmptyState";

const TaskColumn = ({
    title,
    tasks,
    status,
    onEdit,
    onDelete,
    onStatusChange,
}) => {

    const [isDragOver, setIsDragOver] = useState(false);
    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragOver(true);
    };
    const handleDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
        if (!isDragOver) {
            setIsDragOver(true);
        }
    };
    const handleDragLeave = (event) => {
        if (
            event.currentTarget.contains(event.relatedTarget)
        ) {
            return;
        }
        setIsDragOver(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const taskId =
            event.dataTransfer.getData("taskId");
        setIsDragOver(false);
        if (!taskId) {
            return;
        }
        onStatusChange(taskId, status);
    };
    return (
        <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex min-h-[500px] w-full flex-col rounded-2xl p-4 transition-all duration-200
                ${isDragOver
                    ? "bg-indigo-50 ring-2 ring-indigo-400 ring-dashed"
                    : "bg-slate-100"
                }
            `}
        >
            {/* Column Header */}
            <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold text-slate-700">
                    {title}
                </h2>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                    {tasks.length}
                </span>
            </div>
            {/* Drop Area */}
            <div className="flex flex-1 flex-col gap-3">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onStatusChange={
                            onStatusChange
                        }
                    />
                ))}
                {!tasks.length && (
                    <EmptyState
                        title="No tasks here"
                        description="Drag a task here or create a new one."
                    />
                )}
                {tasks.length > 0 &&
                    isDragOver && (
                        <div className="flex min-h-[80px] items-center justify-center rounded-xl border-2 border-dashed border-indigo-400 text-sm font-medium text-indigo-500">
                            Drop task here
                        </div>
                    )}
            </div>
        </div>
    );
};

export default TaskColumn;