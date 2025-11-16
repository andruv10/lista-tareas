import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Filter from './components/Filter';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState('login'); // 'login' o 'register'
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  useEffect(() => {
    if (currentUser) {
      const allTasks = JSON.parse(localStorage.getItem('tasks')) || {};
      setTasks(allTasks[currentUser] || []);
    }
  }, [currentUser]);

  const handleLogin = (username) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleRegister = () => {
    setView('login');
  };

  const addTask = (task) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    const userTasks = allTasks[currentUser] || [];
    const newTasks = [...userTasks, task];
    allTasks[currentUser] = newTasks;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    setTasks(newTasks);
  };

  const deleteTask = (taskId) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    let userTasks = allTasks[currentUser] || [];
    const newTasks = userTasks.filter(task => task.id !== taskId);
    allTasks[currentUser] = newTasks;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    setTasks(newTasks);
  };

  const updateTask = (updatedTask) => {
    const allTasks = JSON.parse(localStorage.getItem('tasks')) || {};
    let userTasks = allTasks[currentUser] || [];
    const newTasks = userTasks.map(task => (task.id === updatedTask.id ? updatedTask : task));
    allTasks[currentUser] = newTasks;
    localStorage.setItem('tasks', JSON.stringify(allTasks));
    setTasks(newTasks);
  };

  const filteredTasks = tasks
    .filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(task =>
      priorityFilter ? task.priority === priorityFilter : true
    );

  if (!currentUser) {
    if (view === 'login') {
      return <Login onLogin={handleLogin} switchToRegister={() => setView('register')} />;
    }
    return <Register onRegister={handleRegister} switchToLogin={() => setView('login')} />;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de Tareas de {currentUser}</h1>
        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      </header>
      <main>
        <TaskForm addTask={addTask} />
        <Filter setSearchTerm={setSearchTerm} setPriorityFilter={setPriorityFilter} />
        <TaskList tasks={filteredTasks} deleteTask={deleteTask} updateTask={updateTask} />
      </main>
    </div>
  );
}

export default App;
