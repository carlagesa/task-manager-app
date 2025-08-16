const API_BASE_URL = "https://task-manager-app-snt9.onrender.com/api";

// API Service Functions
const taskAPI = {
  getTasks: async (isCompleted = null) => {
    try {
      let url = `${API_BASE_URL}/tasks/`;

      if (isCompleted !== null) {
        url += `?is_completed=${isCompleted}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch tasks");
      return await response.json();
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  },

  createTask: async (taskData) => {
    try {
      console.log("Creating task with data:", taskData);

      const response = await fetch(`${API_BASE_URL}/tasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description || "",
          is_completed: false,
        }),
      });

      console.log("Create response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Create error response:", errorText);
        throw new Error(
          `Failed to create task: ${response.status} ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Created task:", result);
      return result;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  },

  // Update an existing task
  updateTask: async (taskId, updates) => {
    try {
      // First, get the current task to merge with updates
      const currentTaskResponse = await fetch(
        `${API_BASE_URL}/tasks/${taskId}`
      );
      if (!currentTaskResponse.ok)
        throw new Error("Failed to fetch current task");
      const currentTask = await currentTaskResponse.json();

      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...currentTask,
          ...updates,
        }),
      });
      if (!response.ok) throw new Error("Failed to update task");
      return await response.json();
    } catch (error) {
      console.error("Error updating task:", error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");
      return true;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  },
};

export { taskAPI };
