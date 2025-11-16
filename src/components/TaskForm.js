import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('baja');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return; // Evita crear tareas sin título
    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      priority,
      status: 'pendiente'
    };
    addTask(newTask);
    // Limpiar el formulario
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('baja');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <h2>Crear Nueva Tarea</h2>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
      <button type="submit">Agregar Tarea</button>
    </form>
  );
};

export default TaskForm;
