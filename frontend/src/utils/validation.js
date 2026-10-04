export const validateTask = (task) => {
    const errors = {};

    /*
     * Title validation
     */
    if (!task.title?.trim()) {
        errors.title =
            "Task title is required.";
    } else if (
        task.title.trim().length < 3
    ) {
        errors.title =
            "Task title must contain at least 3 characters.";
    }

    /*
     * Due date validation
     */
    if (!task.dueDate) {
        errors.dueDate =
            "Due date is required.";
    } else {
        const today =
            new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );

        const selectedDate =
            new Date(task.dueDate);

        if (selectedDate < today) {
            errors.dueDate =
                "Due date cannot be in the past.";
        }
    }

    /*
     * Priority validation
     */
    if (!task.priority) {
        errors.priority =
            "Please select a priority.";
    }

    return errors;
};