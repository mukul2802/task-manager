# Task Manager (MERN + TypeScript)

A simple full-stack Task Manager built with **React + Vite + TypeScript** on the frontend and **Node.js + Express + MongoDB (Mongoose) + TypeScript** on the backend.

## Features

- Create a task (title required, description optional)
- View all tasks (newest first)
- Edit a task's title and description
- Delete a task (with confirmation)
- Mark a task as Completed or Pending with a checkbox
- Pending and completed tasks look different (colored border, status badge, strikethrough)
- Form validation and API error messages shown in the UI
- Responsive layout

Each task has:

| Field         | Type                         | Notes                       |
| ------------- | ---------------------------- | --------------------------- |
| `title`       | string                       | Required, max 100 chars     |
| `description` | string                       | Optional, max 500 chars     |
| `status`      | `"Pending"` \| `"Completed"` | Defaults to `"Pending"`     |
| `createdAt`   | Date                         | Generated automatically     |
| `updatedAt`   | Date                         | Generated automatically     |

## Project Structure

```
task-manager/
  backend/
    src/
      config/
        env.ts                  # Reads PORT, MONGODB_URI, CLIENT_URL from .env
        db.ts                   # connectDB()
      constants/index.ts        # Statuses, length limits, DB name, messages
      controllers/
        taskController.ts       # Handler logic for each endpoint
      middleware/
        validateObjectId.ts     # 400 for malformed IDs
        errorHandler.ts         # 404 route + central error handler
      models/Task.ts            # Mongoose schema
      routes/taskRoutes.ts      # Maps URLs to controllers
      types/task.ts             # ITask, request body and input types
      utils/validateTask.ts     # Request body validation
      app.ts                    # Builds the Express app (middleware + routes)
      server.ts                 # Connects to MongoDB, then starts the server
    .env.example
    package.json
    tsconfig.json
  frontend/
    src/
      api/taskApi.ts            # getTasks, createTask, updateTask, deleteTask
      components/
        TaskForm.tsx            # Add / edit form
        TaskList.tsx            # List, counts, loading and empty states
        TaskItem.tsx            # Single task row
      constants/index.ts        # API_URL, statuses, limits, messages
      utils/
        request.ts              # Fetch wrapper with error handling
        helpers.ts              # getErrorMessage, formatDate, validateTaskForm
      App.tsx                   # Page state and handlers
      App.css                   # Styles
      main.tsx                  # React entry point
      types.ts                  # Task and API types
      vite-env.d.ts             # Types for import.meta.env
    .env.example
    package.json
    tsconfig.json               # (+ tsconfig.app.json / tsconfig.node.json from the Vite template)
    vite.config.ts
  README.md
```

**Request flow (backend):** `routes` → `middleware` (ID check) → `controllers` → `utils` (validation) → `models` (MongoDB). Errors thrown in controllers go to `errorHandler`, because Express 5 passes rejected async handlers to it automatically.

**Data flow (frontend):** `components` → `App.tsx` handlers → `api/taskApi.ts` → `utils/request.ts` → backend.

## Prerequisites

- Node.js 20+ (tested on Node 24)
- MongoDB running locally, or a MongoDB Atlas connection string

## 1. Set Up MongoDB

### Local MongoDB (macOS with Homebrew)

```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

On Windows/Linux, install **MongoDB Community Server** from https://www.mongodb.com/try/download/community and start the `mongod` service.

By default the backend connects to:

```
mongodb://127.0.0.1:27017/task_manager
```

You don't need to create the `task_manager` database yourself. MongoDB creates it when the first task is saved.

### MongoDB Atlas (optional)

Set `MONGODB_URI` in `backend/.env` to your Atlas string, for example:

```
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/task_manager
```

The backend always uses the `task_manager` database (`dbName` option in `server.ts`).

## 2. Run the Backend

```bash
cd backend
npm install
cp .env.example .env      # then edit values if needed
npm run dev               # starts on http://localhost:4000 with auto-reload
```

Other scripts:

```bash
npm run typecheck   # TypeScript check only
npm run build       # compile to dist/
npm start           # run compiled dist/server.js
```

Environment variables (`backend/.env`):

| Variable      | Default                                  | Description                   |
| ------------- | ---------------------------------------- | ----------------------------- |
| `PORT`        | `4000`                                   | API port                      |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/task_manager` | MongoDB connection string     |
| `CLIENT_URL`  | `http://localhost:5173`                  | Frontend origin allowed (CORS)|

## 3. Run the Frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev               # opens on http://localhost:5173
```

The frontend calls `http://localhost:4000/api` by default. To change it, copy `.env.example` to `.env` and set `VITE_API_URL`.

Production build:

```bash
npm run build      # type-checks (tsc -b) and builds to dist/
npm run preview
```

### Dependencies

Backend:

```bash
npm install express mongoose cors dotenv
npm install -D typescript tsx @types/express @types/cors @types/node
```

Frontend (created with `npm create vite@latest frontend -- --template react-ts`): `react`, `react-dom`, plus the template's dev dependencies. No extra libraries. HTTP requests use the built-in Fetch API.

## API Endpoints

Base URL: `http://localhost:4000/api`

| Method | Endpoint     | Description       | Success |
| ------ | ------------ | ----------------- | ------- |
| GET    | `/tasks`     | Get all tasks     | 200     |
| GET    | `/tasks/:id` | Get a task by ID  | 200     |
| POST   | `/tasks`     | Create a task     | 201     |
| PUT    | `/tasks/:id` | Update a task     | 200     |
| DELETE | `/tasks/:id` | Delete a task     | 200     |

**POST body** (`title` required):

```json
{ "title": "Buy milk", "description": "2 litres", "status": "Pending" }
```

**PUT body** (send any of the fields, at least one):

```json
{ "status": "Completed" }
```

**Error responses** always look like `{ "message": "..." }`:

| Status | When                                                        |
| ------ | ----------------------------------------------------------- |
| 400    | Invalid task ID, missing/blank title, invalid status, bad JSON, empty update |
| 404    | Task not found, or unknown route                            |
| 500    | Unexpected server/database error                            |

### Test with curl

```bash
# Create
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk","description":"2 litres"}'

# List
curl http://localhost:4000/api/tasks

# Get one (replace <id>)
curl http://localhost:4000/api/tasks/<id>

# Mark completed
curl -X PUT http://localhost:4000/api/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"status":"Completed"}'

# Delete
curl -X DELETE http://localhost:4000/api/tasks/<id>

# Validation error (400)
curl -X POST http://localhost:4000/api/tasks \
  -H "Content-Type: application/json" -d '{"title":""}'
```

## Design Notes

- **Validation happens twice:** in `utils/validateTask.ts` for clear 400 messages, and in the Mongoose schema (`required`, `enum`, `maxlength`, `runValidators` on updates) as a safety net. Both use the same limits from `constants`.
- **Invalid IDs** are rejected by the `validateObjectId` middleware before any query runs, so they return 400 instead of a server error.
- **No magic strings:** statuses, limits and messages come from `constants/` in each project.
- **Frontend state** uses plain React `useState`. After each API call, local state is updated from the server's response, so the UI always matches the database.
- The same form handles **Add** and **Edit**. Clicking Edit fills the form, and Cancel resets it.
