import TaskForm from "./forms/TaskForm";

/**
 * TaskItem Component
 * Renders individual task item with edit/delete functionality
 * @param {Object} task - Task object to display
 * @param {Function} onToggleComplete - Callback to toggle task completion
 * @param {Function} onEdit - Callback to start editing task
 * @param {Function} onDelete - Callback to delete task
 * @param {Function} onUpdate - Callback to update task
 * @param {number} editingTask - ID of currently editing task
 * @param {Function} setEditingTask - Function to set editing task ID
 * @param {boolean} loading - Loading state indicator
 */

const TaskItem = ({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
  onUpdate,
  editingTask,
  setEditingTask,
  loading,
}) => {
  if (editingTask === task.id) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <TaskForm
          task={task}
          onSubmit={(formData) => onUpdate(task.id, formData)}
          onCancel={() => setEditingTask(null)}
          loading={loading}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-start gap-3">
        {/* Completion Checkbox */}
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={() => onToggleComplete(task.id)}
          className="mt-1 w-4 h-4 text-blue-600 border-blue-300 rounded focus:ring-blue-500"
        />

        <div className="flex-1 min-w-0">
          {/* Task Title */}
          <h3
            className={`font-medium ${
              task.is_completed
                ? "text-gray-500 line-through" // Completed task
                : "text-blue-900" // Active
            }`}
          >
            {task.title}
          </h3>

          {/* Task Description (if exists) */}
          {task.description && (
            <p
              className={`text-sm mt-1 ${
                task.is_completed ? "text-gray-400" : "text-blue-600"
              }`}
            >
              {task.description}
            </p>
          )}

          {/* Creation Date */}
          <p className="text-xs text-gray-400 mt-2">
            Created: {new Date(task.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task.id)}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
