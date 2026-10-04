import { useEffect, useState } from "react";
import { FiCalendar, FiSave } from "react-icons/fi";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { TASK_PRIORITY } from "../../utils/constants";
import { validateTask } from "../../utils/validation";

const initialFormState = {
    title: "",
    description: "",
    dueDate: "",
    priority: TASK_PRIORITY.MEDIUM,
    category: "",
};

const TaskModal = ({ isOpen, onClose, onSubmit, editingTask = null }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (editingTask) {
            setFormData({
                title:
                    editingTask.title || "",
                description:
                    editingTask.description ||
                    "",
                dueDate:
                    editingTask.dueDate || "",
                priority:
                    editingTask.priority ||
                    TASK_PRIORITY.MEDIUM,
                category:
                    editingTask.category || "",
            });
        } else {
            setFormData(initialFormState);
        }
        setErrors({});
    }, [editingTask, isOpen]);
    // Handle input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
        if (errors[name]) { setErrors((previous) => ({ ...previous, [name]: "" })) }
    };
    // Submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors =
            validateTask(formData);
        if (
            Object.keys(
                validationErrors
            ).length > 0
        ) {
            setErrors(
                validationErrors
            );
            return;
        }
        onSubmit(formData);
        setFormData(
            initialFormState
        );
        setErrors({});
    };
    //  Cancel
    const handleClose = () => {
        setFormData(initialFormState);
        setErrors({});
        onClose();
    };
    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={editingTask ? "Edit Task" : "Create New Task"}
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                {/* Title */}
                <div>
                    <label
                        htmlFor="title"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Task Name
                        <span className="text-red-500">
                            {" "}*
                        </span>
                    </label>

                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={
                            formData.title
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="e.g. Complete React assignment"
                        className={`w-full rounded-lg border px-4 py-2.5 outline-none transition focus:ring-2
                            ${errors.title
                                ? "border-red-500 focus:ring-red-100"
                                : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-100"
                            }
                        `}
                    />
                    {errors.title && (
                        <p className="mt-1 text-xs text-red-500">
                            {errors.title}
                        </p>
                    )}
                </div>
                {/* Description */}
                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-slate-700"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="3"
                        value={
                            formData.description
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Add some details about this task..."
                        className="w-full resize-none rounded-lg border border-slate-300 px-4 py-2.5 outline-none transition
                            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />
                </div>
                {/* Date + Priority */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Due Date */}
                    <div>
                        <label
                            htmlFor="dueDate"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Due Date
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>
                        <div className="relative">
                            <FiCalendar
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                size={18}
                            />
                            <input
                                id="dueDate"
                                name="dueDate"
                                type="date"
                                value={
                                    formData.dueDate
                                }
                                onChange={
                                    handleChange
                                }
                                className={`w-full rounded-lg border py-2.5 pl-10 pr-3 outline-none
                                    ${errors.dueDate
                                        ? "border-red-500"
                                        : "border-slate-300"
                                    }
                                `}
                            />
                        </div>
                        {errors.dueDate && (
                            <p className="mt-1 text-xs text-red-500">
                                {errors.dueDate}
                            </p>
                        )}
                    </div>
                    {/* Priority */}
                    <div>
                        <label
                            htmlFor="priority"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Priority
                            <span className="text-red-500">
                                {" "}*
                            </span>
                        </label>
                        <select
                            id="priority"
                            name="priority"
                            value={
                                formData.priority
                            }
                            onChange={
                                handleChange
                            }
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-indigo-500
                                focus:ring-2 focus:ring-indigo-100" >
                            <option value="low">
                                Low
                            </option>
                            <option value="medium">
                                Medium
                            </option>
                            <option value="high">
                                High
                            </option>
                        </select>
                    </div>
                </div>
                {/* Category */}
                <div>
                    <label htmlFor="category"
                        className="mb-2 block text-sm font-medium text-slate-700">
                        Category
                    </label>
                    <input
                        id="category"
                        name="category"
                        type="text"
                        value={
                            formData.category
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="e.g. Development"
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-indigo-500 focus:ring-2
                            focus:ring-indigo-100" />
                </div>
                {/* Actions */}
                <div className="flex justify-end gap-3 border-t pt-5">
                    <Button type="button" variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        <FiSave className="mr-2" />
                        {editingTask ? "Update Task" : "Create Task"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskModal;