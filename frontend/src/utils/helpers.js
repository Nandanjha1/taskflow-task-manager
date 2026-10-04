export const generateId = () => {
    return crypto.randomUUID();
};

export const formatDate = (date) => {
    if (!date) return "";

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(date));
};

export const isOverdue = (task) => {
    if (!task.dueDate) return false;

    return (
        new Date(task.dueDate) < new Date() &&
        task.status !== "completed"
    );
};

export const calculateCompletionRate = (tasks) => {
    if (!tasks.length) return 0;

    const completed = tasks.filter(
        (task) => task.status === "completed"
    ).length;

    return Math.round(
        (completed / tasks.length) * 100
    );
};

export const filterTasks = (
    tasks,
    {
        searchQuery = "",
        statusFilter = "all",
        priorityFilter = "all",
    }
) => {
    return tasks.filter((task) => {

        /*
         * Search
         */
        const query =
            searchQuery
                .trim()
                .toLowerCase();

        const matchesSearch =
            !query ||
            task.title
                ?.toLowerCase()
                .includes(query) ||
            task.description
                ?.toLowerCase()
                .includes(query) ||
            task.category
                ?.toLowerCase()
                .includes(query);

        /*
         * Status
         */
        let matchesStatus = true;

        if (statusFilter !== "all") {

            if (statusFilter === "overdue") {

                matchesStatus =
                    isOverdue(task);

            } else {

                matchesStatus =
                    task.status ===
                    statusFilter;
            }
        }

        /*
         * Priority
         */
        const matchesPriority =
            priorityFilter === "all" ||
            task.priority ===
            priorityFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );
    });
};

export const sortTasks = (
    tasks,
    sortBy
) => {

    const sortedTasks = [
        ...tasks,
    ];

    switch (sortBy) {

        case "newest":
            return sortedTasks.sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            );

        case "oldest":
            return sortedTasks.sort(
                (a, b) =>
                    new Date(a.createdAt) -
                    new Date(b.createdAt)
            );

        case "due-asc":
            return sortedTasks.sort(
                (a, b) =>
                    new Date(a.dueDate) -
                    new Date(b.dueDate)
            );

        case "due-desc":
            return sortedTasks.sort(
                (a, b) =>
                    new Date(b.dueDate) -
                    new Date(a.dueDate)
            );

        case "priority": {

            const priorityOrder = {
                high: 1,
                medium: 2,
                low: 3,
            };

            return sortedTasks.sort(
                (a, b) =>
                    priorityOrder[a.priority] -
                    priorityOrder[b.priority]
            );
        }

        default:
            return sortedTasks;
    }
};