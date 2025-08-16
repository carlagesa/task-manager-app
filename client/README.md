# Task Management App - Client

This is the frontend for the Task Management application, built with React and Vite. It provides a user interface for managing tasks, including creating, viewing, updating, and deleting them.

## Features

-   Create, read, update, and delete tasks.
-   Filter tasks by their completion status.
-   Responsive design with Tailwind CSS.
-   Loading and error states for a better user experience.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  Navigate to the `client` directory:
    ```sh
    cd client
    ```
2.  Install the dependencies:
    ```sh
    npm install
    ```

## Available Scripts

In the `client` directory, you can run the following commands:

-   `npm run dev`: Runs the app in development mode. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
-   `npm run build`: Builds the app for production to the `dist` folder.
-   `npm run lint`: Lints the project files using ESLint.
-   `npm run preview`: Serves the production build locally for preview.

## Technologies Used

-   [React](https://reactjs.org/)
-   [Vite](https://vitejs.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [ESLint](https://eslint.org/)

---

## Development Backend Guides

### Local Development with JSON Server

For local development without the Django backend, you can use `json-server` to mock the API.

1.  **Install JSON Server** (if you haven't already):
    ```sh
    npm install -g json-server
    ```
2.  **Start the Mock Server**:
    From the `client` directory, run:
    ```sh
    npx json-server --watch db.json --port 3001
    ```
3.  **API Endpoints**:
    -   `GET /tasks` → List all tasks
    -   `POST /tasks` → Create a new task
    -   `GET /tasks/:id` → Get a task by ID
    -   `PATCH /tasks/:id` → Update a task
    -   `DELETE /tasks/:id` → Delete a task

### Production with Django Integration

When connecting to the Django backend, ensure the following:

1.  **Update API Base URL**:
    In the API service file (`src/api/apiService.js`), change the `API_BASE_URL` to point to your Django server:
    ```javascript
    const API_BASE_URL = 'http://localhost:8000/api';
    ```
2.  **Endpoint Mapping**:
    -   `GET /api/tasks/` → List tasks
    -   `POST /api/tasks/` → Create task
    -   `GET /api/tasks/{id}/` → Get task
    -   `PATCH /api/tasks/{id}/` → Update task
    -   `DELETE /api/tasks/{id}/` → Delete task
