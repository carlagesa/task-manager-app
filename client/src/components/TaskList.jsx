import TaskItem from "./TaskItem";
/**
 * TaskList Component
 * Renders the list of tasks based on current filter
 * @param {Array} tasks - Array of task objects
 * @param {string} filter - Current filter (all, pending, completed)
 * @param {Function} onToggleComplete - Callback to toggle task completion
 * @param {Function} onEdit - Callback to start editing task
 * @param {Function} onDelete - Callback to delete task
 * @param {Function} onUpdate - Callback to update task
 * @param {number} editingTask - ID of currently editing task
 * @param {Function} setEditingTask - Function to set editing task ID
 * @param {boolean} loading - Loading state indicator
 */

const TaskList = ({
  tasks,
  filter,
  onToggleComplete,
  onEdit,
  onDelete,
  onUpdate,
  editingTask,
  setEditingTask,
  loading,
}) => {
  const filteredTasks = tasks?.filter((task) => {
    if (filter === "completed") return task.is_completed;
    if (filter === "pending") return !task.is_completed;
    return true;
  });

  if (filteredTasks.length === 0 && !loading) {
    return (
      <div className="text-center py-8 text-blue-600">
        <p>No tasks found. Add one above to get started!</p>
      </div>
    );
  }

  // Render filtered tasks.
  return (
    <div className="space-y-3">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdate={onUpdate}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default TaskList;
