import { useEffect, useMemo, useState, } from "react";
import {
    FiCheckCircle,
    FiClock,
    FiList,
    FiLoader,
    FiPlus,
} from "react-icons/fi";
import { filterTasks, sortTasks } from "../utils/helpers";
import Navbar from "../components/layout/Navbar";
import StatsCard from "../components/dashboard/StatsCard";
import TaskBoard from "../components/tasks/TaskBoard";
import TaskModal from "../components/tasks/TaskModal";
import Button from "../components/common/Button";
import TaskToolbar from "../components/tasks/TaskToolbar";
import { useTasks, } from "../hooks/useTasks";
import { TASK_STATUS, } from "../utils/constants";
import { useToast } from "../context/ToastContext";
import ConfirmDialog from "../components/tasks/ConfirmDialog";
import Spinner from "../components/common/Spinner";
import { getApiErrorMessage } from "../utils/apiError";

const Dashboard = () => {

    const {
        tasks,
        addTask,
        deleteTask,
        updateTask,
        updateTaskStatus,
        clearCompletedTasks,
        loading,
        error,
    } = useTasks();

    const [taskToDelete, setTaskToDelete] = useState(null);
    const { showToast } = useToast();
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [darkMode, setDarkMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [sortBy, setSortBy] = useState("newest");
    const [showClearConfirmation, setShowClearConfirmation] = useState(false);
    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            darkMode
        );
    }, [darkMode]);

    useEffect(() => {
        const savedTheme =
            localStorage.getItem("taskflow_theme");

        if (savedTheme === "dark") {
            setDarkMode(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "taskflow_theme",
            darkMode ? "dark" : "light"
        );
    }, [darkMode]);
    /*
     * Calculate dashboard statistics
     */
    const stats = useMemo(() => {
        const total =
            tasks.length;

        const todo =
            tasks.filter(
                (task) =>
                    task.status ===
                    TASK_STATUS.TODO
            ).length;

        const progress =
            tasks.filter(
                (task) =>
                    task.status ===
                    TASK_STATUS.IN_PROGRESS
            ).length;

        const completed =
            tasks.filter(
                (task) =>
                    task.status ===
                    TASK_STATUS.COMPLETED
            ).length;

        return {
            total,
            todo,
            progress,
            completed,
        };

    }, [tasks]);

    /*
     * Open modal for creating
     */
    const handleAddTask = () => {
        setEditingTask(null);
        setIsTaskModalOpen(true);
    };

    /*
     * Open modal for editing
     */
    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsTaskModalOpen(true);
    };

    /*
     * Save task
     */
    const handleSubmitTask = async (formData) => {

        try {

            if (editingTask) {

                await updateTask(
                    editingTask.id,
                    formData
                );

                showToast(
                    "Task updated successfully.",
                    "success"
                );

            } else {

                await addTask(formData);

                showToast(
                    "Task created successfully.",
                    "success"
                );
            }

            handleCloseModal();

        } catch (error) {

            showToast(
                getApiErrorMessage(error),
                "error"
            );
        }
    };

    const handleDeleteTask = async (taskId) => {

        deleteTask(taskId);

        showToast(
            "Task deleted successfully.",
            "success"
        );
    };

    const confirmDeleteTask = async () => {

        if (!taskToDelete) return;

        try {

            await deleteTask(taskToDelete.id);

            showToast(
                "Task deleted successfully.",
                "success"
            );

            setTaskToDelete(null);

        } catch (error) {

            showToast(
                getApiErrorMessage(error),
                "error"
            );
        }
    };

    const confirmClearCompleted = async () => {

        try {

            await clearCompletedTasks();

            showToast(
                "Completed tasks cleared.",
                "success"
            );

            setShowClearConfirmation(false);

        } catch (error) {

            console.error(error);

            showToast(
                "Failed to clear completed tasks.",
                "error"
            );
        }
    };

    const handleStatusChange = async (
        taskId,
        newStatus
    ) => {
        try {
            await updateTaskStatus(
                taskId,
                newStatus
            );
            const messages = {
                todo: "Task moved to To Do.",
                "in-progress":
                    "Task moved to In Progress.",
                completed:
                    "Task marked as completed.",
            };
            showToast(
                messages[newStatus] ||
                "Task status updated.",
                "success"
            );
        } catch (error) {
            console.error(error);
            showToast(
                "Failed to update task status.",
                "error"
            );
        }
    };

    /*
     * Close modal
     */
    const handleCloseModal = () => {
        setIsTaskModalOpen(false);
        setEditingTask(null);
    };

    const completedCount =
        tasks.filter(
            (task) =>
                task.status ===
                TASK_STATUS.COMPLETED
        ).length;

    const filteredTasks = useMemo(() => {

        const filtered = filterTasks(
            tasks,
            {
                searchQuery,
                statusFilter,
                priorityFilter,
            }
        );

        return sortTasks(
            filtered,
            sortBy
        );

    }, [
        tasks,
        searchQuery,
        statusFilter,
        priorityFilter,
        sortBy,
    ]);

    const hasActiveFilters =
        searchQuery.trim() !== "" ||
        statusFilter !== "all" ||
        priorityFilter !== "all";

    return (
        <div className="min-h-screen bg-slate-50 transition-colors dark:bg-slate-950">

            <Navbar
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />

            {error && (
                <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800">
                    {error}
                </div>
            )}

            <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                {/* Header */}

                <div className="
                    mb-8
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                ">

                    <div>
                        <h1 className="
                            text-3xl
                            font-bold
                            text-slate-900 dark:text-white
                        ">
                            Task Dashboard
                        </h1>

                        <p className="
                            mt-1
                            text-slate-500 dark:text-slate-400
                        ">
                            Organize your work
                            and stay productive.
                        </p>
                    </div>

                    <Button
                        onClick={
                            handleAddTask
                        }
                    >
                        <FiPlus
                            className="mr-2"
                        />

                        Add Task
                    </Button>

                </div>

                {/* Statistics */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    <StatsCard
                        title="Total Tasks"
                        value={stats.total}
                        icon={
                            <FiList
                                size={22}
                            />
                        }
                    />

                    <StatsCard
                        title="To Do"
                        value={stats.todo}
                        icon={
                            <FiClock
                                size={22}
                            />
                        }
                    />

                    <StatsCard
                        title="In Progress"
                        value={stats.progress}
                        icon={
                            <FiLoader
                                size={22}
                            />
                        }
                    />

                    <StatsCard
                        title="Completed"
                        value={
                            stats.completed
                        }
                        icon={
                            <FiCheckCircle
                                size={22}
                            />
                        }
                    />

                </div>

                {/* Task Toolbar */}

                <TaskToolbar
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}

                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}

                    priorityFilter={priorityFilter}
                    setPriorityFilter={
                        setPriorityFilter
                    }

                    sortBy={sortBy}
                    setSortBy={setSortBy}

                    onClearCompleted={() =>
                        setShowClearConfirmation(true)
                    }
                    hasCompletedTasks={
                        completedCount > 0
                    }
                />

                {/* Kanban Board */}

                {loading ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <Spinner size="lg" />
                    </div>
                ) : (
                    <TaskBoard
                        tasks={filteredTasks}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        onStatusChange={handleStatusChange}
                    />
                )}

            </main>

            {/* Task Modal */}

            <TaskModal
                isOpen={
                    isTaskModalOpen
                }
                onClose={
                    handleCloseModal
                }
                onSubmit={
                    handleSubmitTask
                }
                editingTask={
                    editingTask
                }
            />

            <ConfirmDialog
                isOpen={
                    showClearConfirmation
                }
                onClose={() =>
                    setShowClearConfirmation(
                        false
                    )
                }
                onConfirm={
                    confirmClearCompleted
                }
                title="Clear Completed Tasks?"
                message="
        All completed tasks will be
        permanently removed.
    "
                confirmText="Clear Tasks"
            />

        </div>
    );
};

export default Dashboard;