import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { getStoredTasks, saveTasks } from "../utils/storage";
import { generateId } from "../utils/helpers";
import { TASK_STATUS } from "../utils/constants";
import {
    createTask as createTaskAPI,
    getTasks as getTasksAPI,
    updateTask as updateTaskAPI,
    deleteTask as deleteTaskAPI,
    updateTaskStatus as updateTaskStatusAPI,
    clearCompletedTasks as clearCompletedTasksAPI,
} from "../services/taskService";

export const TaskContext = createContext(null);
const USE_API = import.meta.env.VITE_USE_API === "true";

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [initialized, setInitialized] = useState(false);

    // --------------------------------
    // Load Tasks
    // --------------------------------

    const loadTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            if (USE_API) {
                const apiTasks = await getTasksAPI();
                setTasks(apiTasks);
                // Save API data as local cache
                saveTasks(apiTasks);
            } else {
                const storedTasks = getStoredTasks();
                setTasks(storedTasks);
            }
        } catch (apiError) {
            console.error(
                "API failed. Loading local cache.",
                apiError
            );
            const storedTasks = getStoredTasks();
            setTasks(storedTasks);
            setError(
                "Backend unavailable. Using local data."
            );
        } finally {
            setInitialized(true);
            setLoading(false);
        }
    }, []);

    // --------------------------------
    // Initial Load
    // --------------------------------

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    // --------------------------------
    // Local Cache
    // --------------------------------

    useEffect(() => {
        if (!initialized) {
            return;
        }
        saveTasks(tasks);
    }, [tasks, initialized]);

    // --------------------------------
    // Add Task
    // --------------------------------

    const addTask = async (taskData) => {
        const newTask = {
            title: taskData.title.trim(),
            description:
                taskData.description?.trim() || "",
            dueDate: taskData.dueDate,
            priority: taskData.priority,
            status: TASK_STATUS.TODO,
            category:
                taskData.category?.trim() || "General",
        };

        try {
            if (USE_API) {
                const createdTask =
                    await createTaskAPI(newTask);
                setTasks((prevTasks) => [
                    createdTask,
                    ...prevTasks,
                ]);
                return createdTask;
            }

            // LocalStorage fallback

            const localTask = {
                id: generateId(),
                ...newTask,
                createdAt:
                    new Date().toISOString(),
            };
            setTasks((prevTasks) => [
                localTask,
                ...prevTasks,
            ]);
            return localTask;
        } catch (error) {

            console.error(
                "Failed to create task:",
                error
            );

            setError(
                "Unable to save task to the server."
            );

            throw error;
        }
    };

    // --------------------------------
    // Update Task
    // --------------------------------

    const updateTask = async (
        id,
        updatedData
    ) => {
        try {
            if (USE_API) {
                const updatedTask =
                    await updateTaskAPI(
                        id,
                        updatedData
                    );
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        String(task.id) === String(id)
                            ? updatedTask
                            : task
                    )
                );
                return updatedTask;
            }

            // LocalStorage mode

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    String(task.id) === String(id)
                        ? {
                            ...task,
                            ...updatedData,
                        }
                        : task
                )
            );
        } catch (error) {
            console.error(
                "Failed to update task:",
                error
            );

            // Local fallback

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    String(task.id) === String(id)
                        ? {
                            ...task,
                            ...updatedData,
                        }
                        : task
                )
            );
            setError(
                "Task updated locally because backend is unavailable."
            );
        }
    };

    // --------------------------------
    // Delete Task
    // --------------------------------

    const deleteTask = async (id) => {
        try {
            if (USE_API) {
                await deleteTaskAPI(id);
            }
            setTasks((prevTasks) =>
                prevTasks.filter(
                    (task) =>
                        String(task.id) !== String(id)
                )
            );
        } catch (error) {
            console.error(
                "Failed to delete task:",
                error
            );

            // Local fallback

            setTasks((prevTasks) =>
                prevTasks.filter(
                    (task) =>
                        String(task.id) !== String(id)
                )
            );
            setError(
                "Task deleted locally because backend is unavailable."
            );
        }
    };

    // --------------------------------
    // Update Status
    // --------------------------------

    const updateTaskStatus = async (
        id,
        status
    ) => {
        try {
            if (USE_API) {
                const updatedTask =
                    await updateTaskStatusAPI(
                        id,
                        status
                    );
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        String(task.id) === String(id)
                            ? updatedTask
                            : task
                    )
                );
                return updatedTask;
            }

            // LocalStorage mode

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    String(task.id) === String(id)
                        ? {
                            ...task,
                            status,
                        }
                        : task
                )
            );
        } catch (error) {
            console.error(
                "Failed to update task status:",
                error
            );

            // Local fallback

            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    String(task.id) === String(id)
                        ? {
                            ...task,
                            status,
                        }
                        : task
                )
            );
            setError(
                "Status updated locally because backend is unavailable."
            );
        }
    };

    // --------------------------------
    // Clear Completed Tasks
    // --------------------------------

    const clearCompletedTasks = async () => {
        try {
            if (USE_API) {

                await clearCompletedTasksAPI();
            }
            setTasks((prevTasks) =>
                prevTasks.filter(
                    (task) =>
                        task.status !==
                        TASK_STATUS.COMPLETED
                )
            );
        } catch (error) {
            console.error(
                "Failed to clear completed tasks:",
                error
            );

            // Local fallback

            setTasks((prevTasks) =>
                prevTasks.filter(
                    (task) =>
                        task.status !==
                        TASK_STATUS.COMPLETED
                )
            );
            setError(
                "Completed tasks cleared locally."
            );
        }
    };

    // --------------------------------
    // Context Value
    // --------------------------------

    const value = {
        tasks,
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        updateTaskStatus,
        clearCompletedTasks,
        refreshTasks: loadTasks,
    };

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error(
            "useTaskContext must be used inside TaskProvider"
        );
    }
    return context;
};