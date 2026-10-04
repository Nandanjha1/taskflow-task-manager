import {
    useTaskContext,
} from "../context/TaskContext";

export const useTasks = () => {
    return useTaskContext();
};