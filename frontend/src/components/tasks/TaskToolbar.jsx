import { FiFilter, FiSearch, FiTrash2 } from "react-icons/fi";
import Button from "../common/Button";

const TaskToolbar = ({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    onClearCompleted,
    hasCompletedTasks,
}) => {
    return (
        <div className="mb-6 mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4 rounded-xl border bg-white p-4 shadow-sm lg:flex-row lg:items-center">
                {/* Search */}
                <div className="relative w-full xl:max-w-sm">
                    <FiSearch size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search tasks..."
                        className="w-full rounded-lg border border-slate-300 py-2.5 98 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                </div>
                {/* Filters */}
                <div className="flex flex-wrap items-center gap-3">
                    {/* Status */}
                    <div className="flex items-center gap-2">
                        <FiFilter size={16} className="text-slate-400" />
                        <select
                            value={statusFilter}
                            onChange={(event) => setStatusFilter(event.target.value)}
                            className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
                        >
                            <option value="all">
                                All Status
                            </option>
                            <option value="todo">
                                To Do
                            </option>
                            <option value="in-progress">
                                In Progress
                            </option>
                            <option value="completed">
                                Completed
                            </option>
                            <option value="overdue">
                                Overdue
                            </option>
                        </select>
                    </div>
                    {/* Priority */}
                    <select
                        value={priorityFilter}
                        onChange={(event) => setPriorityFilter(event.target.value)}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
                    >
                        <option value="all">
                            All Priority
                        </option>
                        <option value="high">
                            High Priority
                        </option>
                        <option value="medium">
                            Medium Priority
                        </option>
                        <option value="low">
                            Low Priority
                        </option>
                    </select>
                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(event) =>
                            setSortBy(event.target.value)
                        }
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-indigo-500"
                    >
                        <option value="newest">
                            Newest
                        </option>
                        <option value="oldest">
                            Oldest
                        </option>
                        <option value="due-asc">
                            Due Date ↑
                        </option>
                        <option value="due-desc">
                            Due Date ↓
                        </option>
                        <option value="priority">
                            Priority
                        </option>
                    </select>
                    {/* Clear Completed */}
                    {hasCompletedTasks && (
                        <Button
                            variant="danger"
                            onClick={onClearCompleted}
                        >
                            <FiTrash2 className="mr-2" size={16} />
                            Clear Completed
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskToolbar;