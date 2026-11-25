import { useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Users,
  Settings,
  Bell,
  Search,
  Plus,
  Clock,
  CheckCircle,
  Circle,
  Trash2,
  Pencil,
} from "lucide-react";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design Dashboard UI",
      category: "Website",
      status: "Completed",
      priority: "High",
    },
    {
      id: 2,
      title: "Develop REST API",
      category: "Backend",
      status: "In Progress",
      priority: "High",
    },
    {
      id: 3,
      title: "Connect MongoDB",
      category: "Backend",
      status: "Pending",
      priority: "Medium",
    },
    {
      id: 4,
      title: "Setup CI/CD Pipeline",
      category: "DevOps",
      status: "Pending",
      priority: "Low",
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");

  // Add Task
  const addTask = () => {
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(),
      title: newTask.trim(),
      category: "General",
      status: "Pending",
      priority: "Medium",
    };

    setTasks((currentTasks) => [...currentTasks, task]);
    setNewTask("");
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  };

  // Edit Task
  const editTask = (id) => {
    const currentTask = tasks.find((task) => task.id === id);

    if (!currentTask) return;

    const updatedTitle = prompt("Enter new task name:", currentTask.title);

    if (updatedTitle !== null && updatedTitle.trim() !== "") {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? { ...task, title: updatedTitle.trim() } : task,
        ),
      );
    }
  };

  // Complete Task
  const toggleTask = (id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Completed" ? "Pending" : "Completed",
            }
          : task,
      ),
    );
  };

  // Search Tasks
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Dashboard Statistics
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status !== "Completed",
  ).length;

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">TaskFlow</h2>

        <nav>
          <a className="active">
            <LayoutDashboard size={18} /> Dashboard
          </a>

          <a>
            <CheckSquare size={18} /> My Tasks
          </a>

          <a>
            <FolderKanban size={18} /> Projects
          </a>

          <a>
            <Users size={18} /> Team Members
          </a>

          <a>
            <Settings size={18} /> Settings
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div className="search-box">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Bell size={22} />
        </header>

        {/* Welcome */}
        <section className="welcome">
          <h1>Welcome Back!</h1>
          <p>Here's what's happening with your projects today.</p>
        </section>

        {/* Statistics */}
        <section className="stats-grid">
          <div className="stat-card">
            <LayoutDashboard />
            <h3>Total Tasks</h3>
            <h2>{totalTasks}</h2>
          </div>

          <div className="stat-card">
            <CheckCircle />
            <h3>Completed</h3>
            <h2>{completedTasks}</h2>
          </div>

          <div className="stat-card">
            <Clock />
            <h3>Pending</h3>
            <h2>{pendingTasks}</h2>
          </div>

          <div className="stat-card">
            <FolderKanban />
            <h3>Projects</h3>
            <h2>4</h2>
          </div>
        </section>

        {/* Tasks Section */}
        <section className="tasks-section">
          <div className="section-header">
            <div>
              <h2>My Tasks</h2>
              <p>Manage your daily tasks</p>
            </div>
          </div>

          {/* Add Task */}
          <div className="add-task">
            <input
              type="text"
              placeholder="Enter a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTask();
              }}
            />

            <button onClick={addTask}>
              <Plus size={18} /> Add Task
            </button>
          </div>

          {/* Task List */}
          <div className="task-list">
            {filteredTasks.map((task) => (
              <div className="task-item" key={task.id}>
                <div className="task-info">
                  <button
                    className="complete-btn"
                    onClick={() => toggleTask(task.id)}
                    title="Complete Task"
                  >
                    {task.status === "Completed" ? (
                      <CheckCircle size={20} />
                    ) : (
                      <Circle size={20} />
                    )}
                  </button>

                  <div>
                    <h3
                      className={task.status === "Completed" ? "completed" : ""}
                    >
                      {task.title}
                    </h3>

                    <p>{task.category}</p>
                  </div>
                </div>

                <div className="task-actions">
                  <span
                    className={`status ${task.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {task.status}
                  </span>

                  <span className="priority">{task.priority}</span>

                  {/* Edit Button */}
                  <button
                    className="edit-btn"
                    onClick={() => editTask(task.id)}
                    title="Edit Task"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task.id)}
                    title="Delete Task"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}

            {/* Empty Message */}
            {filteredTasks.length === 0 && (
              <p>
                {tasks.length === 0
                  ? "No tasks available. Add your first task!"
                  : "No matching tasks found!"}
              </p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
