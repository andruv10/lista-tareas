import React from 'react';

const TaskList = ({ tasks, deleteTask, updateTask }) => {
  const renderTask = (task) => (
    <div key={task.id} className="task">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p><strong>Prioridad:</strong> {task.priority}</p>
      <div className="task-actions">
        <button onClick={() => deleteTask(task.id)}>Eliminar</button>
        {task.status !== 'completada' && (
          <button onClick={() => updateTask({ ...task, status: 'completada' })}>
            Marcar como Completada
          </button>
        )}
        <button onClick={() => {
          const newStatus = prompt("Nuevo estado (pendiente, en progreso, completada):", task.status);
          if (newStatus && ['pendiente', 'en progreso', 'completada'].includes(newStatus)) {
            updateTask({ ...task, status: newStatus });
          }
        }}>Editar Estado</button>
      </div>
    </div>
  );

  const pendingTasks = tasks.filter(task => task.status === 'pendiente');
  const inProgressTasks = tasks.filter(task => task.status === 'en progreso');
  const completedTasks = tasks.filter(task => task.status === 'completada');

  return (
    <div className="task-list-columns">
      <div className="task-column">
        <h2>Pendiente</h2>
        {pendingTasks.map(renderTask)}
      </div>
      <div className="task-column">
        <h2>En Progreso</h2>
        {inProgressTasks.map(renderTask)}
      </div>
      <div className="task-column">
        <h2>Completada</h2>
        {completedTasks.map(renderTask)}
      </div>
    </div>
  );
};

export default TaskList;
