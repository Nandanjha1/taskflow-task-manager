export const getStoredTasks = () => {
    try {
        const storedTasks = localStorage.getItem(
            "taskflow_tasks"
        );

        return storedTasks
            ? JSON.parse(storedTasks)
            : [];
    } catch (error) {
        console.error(
            "Failed to load tasks:",
            error
        );

        return [];
    }
};

export const saveTasks = (tasks) => {
    try {
        localStorage.setItem(
            "taskflow_tasks",
            JSON.stringify(tasks)
        );
    } catch (error) {
        console.error(
            "Failed to save tasks:",
            error
        );
    }
};

export const clearStoredTasks = () => {
    localStorage.removeItem("taskflow_tasks");
};