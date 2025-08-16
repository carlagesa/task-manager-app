import { useState } from "react";

/**
 * TaskForm Component
 * Handles both creating new tasks and editing existing tasks
 * @param {Object} task - Task object for editing (null for new task)
 * @param {Function} onSubmit - Callback function when form is submitted
 * @param {Function} onCancel - Callback function when editing is cancelled
 * @param {boolean} loading - Loading state indicator
 */

const TaskForm = ({ task = null, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState(
    task || { title: "", description: "" }
  );

  // Handle form submission
  const handleSubmit = () => {
    if (!formData.title.trim()) return;
    onSubmit(formData);
    // Clear form only for new tasks (not when editing)
    if (!task) {
      setFormData({ title: "", description: "" });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-3">
      {/* Task Title Input */}
      <input
        type="text"
        placeholder="Task title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        onKeyPress={handleKeyPress}
        className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
        maxLength="200"
      />

      {/* Task Description Textarea */}
      <textarea
        placeholder="Description (optional)"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
        rows="2"
      />

      {/* Form Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading || !formData.title.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {task ? "Update" : "Add Task"}
        </button>
        {/* Cancel button only shown when editing */}
        {task && (
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
