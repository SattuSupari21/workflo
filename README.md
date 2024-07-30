# Workflo

Simple Trello clone

## Features

- **Task Management**: Create, read, update, and delete tasks.
- **Due Dates**: Set and manage due dates for tasks.
- **Drag and Drop**: Quickly change status of tasks by dragging and droping them.

## Technologies Used

- **Frontend:**

  - Next.js
  - Tailwind CSS
  - shadcn/ui
  - Zod
  - React Context API

- **Backend:**
  - Node.js
  - Express.js (RESTful API)
  - MongoDB (Database)
  - Prisma (ORM)

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js and npm
- MongoDB

## Getting Started

1. Clone the repository:

```
git clone https://github.com/SattuSupari21/workflo.git
```

2. Navigate to backend and install dependencies:

```
cd backend
npm install
```

3. Navigate to frontend and install dependencies:

```
cd frontend
npm install
```

4. Set up the PostgreSQL database:
   - Create a new database named `workflo`.
   - Paste the connection URL in .env file in the backend directory.
5. Create a .env file in backend directory.

```
DATABASE_URL="mongodb+srv://[username:password@]host[/[defaultauthdb][?options]]"
```

6. Start the Backend and Frontend server:

```
npm run dev
```

7. Open your web browser and navigate to `http://localhost:3000` to access the application.

## API Endpoints

#### Tasks

- GET /api/v1/tasks/getAllTasks: Retrieve all tasks.
- POST /api/v1/tasks/createTask: Create a new task.
- PUT /api/v1/tasks/updateTask/id : Update a task by ID.
- DELETE /api/v1/tasks/deleteTask/id : Delete a task by ID.
