import TaskColumn from "./TaskColumn";
import { TASK_STATUS } from "../../utils/constants";

const TaskBoard = ({ tasks, onEdit, onDelete, onStatusChange }) => {

    const todoTasks = tasks.filter((task) =>
        task.status === TASK_STATUS.TODO
    );

    const progressTasks = tasks.filter((task) =>
        task.status === TASK_STATUS.IN_PROGRESS
    );

    const completedTasks = tasks.filter((task) =>
        task.status === TASK_STATUS.COMPLETED
    );

    return (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <TaskColumn
                title="To Do"
                status={TASK_STATUS.TODO}
                tasks={todoTasks}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={
                    onStatusChange
                }
            />

            <TaskColumn
                title="In Progress"
                status={
                    TASK_STATUS.IN_PROGRESS
                }
                tasks={progressTasks}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={
                    onStatusChange
                }
            />

            <TaskColumn
                title="Completed"
                status={
                    TASK_STATUS.COMPLETED
                }
                tasks={completedTasks}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatusChange={
                    onStatusChange
                }
            />
        </div>
    );
};

export default TaskBoard;