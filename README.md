# 🚀 TaskFlow – Smart Task Management System

TaskFlow is a full-stack task management application designed to help users create, organize, track, and manage tasks through a responsive Kanban-style dashboard.

The project demonstrates modern frontend development with React and Tailwind CSS, combined with a Python FastAPI backend, REST APIs, SQLAlchemy, and SQLite persistence.

---

## ✨ Features

### Task Management

- Create tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- Reopen completed tasks
- Move tasks between statuses
- Clear all completed tasks

### Organization

- Kanban board
- Native drag-and-drop
- Task priorities
- Task categories
- Due-date management
- Overdue task detection

### Search, Filter & Sort

- Search by task title
- Search by description
- Search by category
- Filter by status
- Filter overdue tasks
- Filter by priority
- Sort by creation date
- Sort by due date
- Sort by priority

### User Experience

- Responsive design
- Dark mode
- Toast notifications
- Confirmation dialogs
- Empty states
- Loading states
- API health status
- Accessible controls
- Centralized API error handling

### Data & Backend

- REST API
- FastAPI backend
- SQLite database
- SQLAlchemy ORM
- Pydantic validation
- LocalStorage cache/fallback
- Backend error handling
- CORS configuration

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router
- React Icons

### Backend

- Python
- FastAPI
- Pydantic
- SQLAlchemy
- SQLite
- Uvicorn

---

## 🏗️ Architecture

```text
                    TaskFlow
                       │
                React Frontend
                       │
                 Context API
                       │
                Axios Services
                       │
                FastAPI REST API
                       │
                   Pydantic
                       │
                  CRUD Layer
                       │
                  SQLAlchemy
                       │
                     SQLite
```

### Data Flow

```text
User Action
    ↓
React Component
    ↓
TaskContext
    ↓
Task Service
    ↓
Axios
    ↓
FastAPI Endpoint
    ↓
CRUD Layer
    ↓
SQLAlchemy
    ↓
SQLite
    ↓
API Response
    ↓
React UI Update
```

---

## 📁 Project Structure

```text
TaskFlow/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── config.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   ├── .env.example
│   └── requirements.txt
│
├── docs/
│   └── screenshots/
│
├── .gitignore
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/Nandanjha1/taskflow-task-manager.git
cd TaskFlow
```

---

## 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_API=true
```

Start the frontend:

```bash
npm run dev
```

---

## 3. Backend Setup

Open another terminal:

```bash
cd backend
python -m venv venv
```

### Windows PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file:

```env
DATABASE_URL=sqlite:///./taskflow.db
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
uvicorn app.main:app --reload --port 8000
```

---

# 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/{id}` | Get a specific task |
| PUT | `/api/tasks/{id}` | Update a task |
| PATCH | `/api/tasks/{id}/status` | Update task status |
| DELETE | `/api/tasks/{id}` | Delete a task |
| DELETE | `/api/tasks/completed` | Clear completed tasks |

FastAPI also provides interactive API documentation through Swagger UI.

---

# 💾 Data Persistence

TaskFlow uses **SQLite as the primary database**.

The application also maintains a **LocalStorage cache/fallback** on the frontend.

```text
Primary Storage
      ↓
   SQLite
      ↓
FastAPI API
      ↓
   React UI

Fallback
      ↓
LocalStorage
```

This allows the application to continue providing cached task data if the backend becomes temporarily unavailable.

---

# 📋 Kanban Workflow

```text
┌─────────┐
│  TODO   │
└────┬────┘
     │
     ↓
┌─────────────┐
│ IN PROGRESS │
└──────┬──────┘
       │
       ↓
┌───────────┐
│ COMPLETED │
└───────────┘
```

Tasks can be moved between columns using native drag-and-drop.

---

# 🔎 Search, Filter & Sort

TaskFlow provides multiple ways to organize tasks:

### Search

- Task title
- Description
- Category

### Filters

- All tasks
- To Do
- In Progress
- Completed
- Overdue
- High priority
- Medium priority
- Low priority

### Sorting

- Newest first
- Oldest first
- Due date ascending
- Due date descending
- Priority

---

# 🧪 Validation

Validation is implemented on both the frontend and backend.

The application validates:

- Required task title
- Minimum title length
- Required due date
- Future due date
- Valid priority
- Valid task status
- Category length
- Description length

Backend validation is handled using Pydantic.

---

# 🖼️ Screenshots

### Dashboard

![TaskFlow Dashboard](image.png)

> If additional screenshots are added, place them inside `docs/screenshots/` and reference them using their relative paths.

Example:

```markdown
![Kanban Board](docs/screenshots/kanban.png)
```

---

# 📚 JavaScript Concepts Demonstrated

This project demonstrates practical usage of:

- Variables
- Functions
- Arrow functions
- ES6 modules
- Objects and arrays
- Array methods
- Event handling
- Form handling
- State management
- Context API
- Async/Await
- Promises
- REST API integration
- Axios
- Error handling
- LocalStorage
- Drag-and-drop events
- Dynamic UI rendering

---

# 🌟 Key Highlights

Some additional improvements implemented beyond the basic task requirements include:

- Full-stack architecture
- REST API integration
- SQLite persistence
- Native drag-and-drop Kanban
- LocalStorage fallback
- API health monitoring
- Centralized API error handling
- Responsive design
- Dark mode
- Accessible UI controls
- Confirmation dialogs
- Toast notifications
- Search, filtering, and sorting

---

# 🔐 Environment Variables

Environment files containing local configuration are excluded from Git.

Example configuration files are provided through:

```text
frontend/.env.example
backend/.env.example
```

Never commit actual `.env` files containing private configuration.

---

# 🔮 Future Improvements

Potential future enhancements include:

- User authentication
- JWT-based authorization
- Role-based access control
- PostgreSQL support
- Task reminders
- Email notifications
- Team collaboration
- Real-time updates using WebSockets
- Analytics dashboard
- Task attachments
- Activity history

---

# 🎥 Demonstration

A complete project walkthrough demonstrating the major features and application flow is available in the Loom demo.

**Demo:** https://www.loom.com/share/b18151ae720d472884f44f56102058fd

---

# 👨‍💻 Author

**Nandan Kumar**

Developer Intern — Nestorbird

### Technologies

React.js · Tailwind CSS · Python · FastAPI · SQLAlchemy · SQLite · JavaScript
