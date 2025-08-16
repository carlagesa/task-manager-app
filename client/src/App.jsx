import { useState, useEffect } from "react";
import Header from "./components/Header";
import TaskForm from "./components/forms/TaskForm";
import FilterButtons from "./components/FilterButtons";
import ErrorMessage from "./components/ErrorMessage";
import LoadingSpinner from "./components/LoadingSpinner";
import TaskList from "./components/TaskList";
import { taskAPI } from "./api/apiService";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");

  /**
   * Load tasks from API on component mount
   * Currently using JSON Server - will switch to Django API later
   */
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await taskAPI.getTasks();
        const tasksData = Array.isArray(response)
          ? response
          : response.results || [];
        setTasks(tasksData);
      } catch (err) {
        setError("Failed to load tasks.");
        console.error("Error loading tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  /**
   * Add a new task
   * @param {Object} taskData - New task data (title, description)
   */
  const addTask = async (taskData) => {
    try {
      setLoading(true);
      setError("");

      console.log("Adding task:", taskData);

      const newTask = await taskAPI.createTask(taskData);

      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      if (err.message.includes("Failed to fetch")) {
        setError(
          "Cannot connect to the server. Please check your internet connection."
        );
      } else if (err.message.includes("400")) {
        setError("Invalid task data. Please check your input.");
      } else if (err.message.includes("CORS")) {
        setError("CORS error: The server configuration needs to be updated.");
      } else {
        setError(`Failed to create task: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update an existing task
   * @param {number} id - Task ID to update
   * @param {Object} updates - Task updates (title, description, is_completed)
   */
  const updateTask = async (id, updates) => {
    try {
      setLoading(true);
      setError("");

      const updatedTask = await taskAPI.updateTask(id, updates);

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
      setEditingTask(null);
    } catch (err) {
      if (err.message.includes("404")) {
        setError("Task not found. It may have been deleted.");
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } else if (err.message.includes("Failed to fetch")) {
        setError(
          "Cannot connect to the server. Please check your internet connection."
        );
      } else {
        setError(`Failed to update task: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a task
   * @param {number} id - Task ID to delete
   */
  const deleteTask = async (id) => {
    try {
      setLoading(true);
      setError("");

      await taskAPI.deleteTask(id);

      // Update local state
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      setError("Failed to delete task. Make sure JSON Server is running.");
      console.error("Error deleting task:", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Toggle task completion status
   * @param {number} id - Task ID to toggle
   */
  const toggleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      updateTask(id, { is_completed: !task.is_completed });
    }
  };

  /**
   * Start editing a task
   * @param {number} id - Task ID to edit
   */
  const handleEdit = (id) => {
    setEditingTask(id);
  };

  /**
   * Change the current filter
   * @param {string} newFilter - New filter value (all, pending, completed)
   */
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* App Header */}
        <Header />

        {/* Add Task Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">
            Add New Task
          </h2>
          <TaskForm onSubmit={addTask} loading={loading} />
        </div>

        {/* Filter Controls */}
        <FilterButtons
          currentFilter={filter}
          onFilterChange={handleFilterChange}
        />

        {/* Error Display */}
        <ErrorMessage error={error} />

        {/* Loading Indicator */}
        {loading && <LoadingSpinner />}

        {/* Tasks List */}
        <TaskList
          tasks={tasks}
          filter={filter}
          onToggleComplete={toggleComplete}
          onEdit={handleEdit}
          onDelete={deleteTask}
          onUpdate={updateTask}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default App;
