import React, { useState } from 'react';

const Register = ({ onRegister, switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    // Simulación de registro
    try {
      const users = JSON.parse(localStorage.getItem('users')) || {};
      if (users[username]) {
        setError('El nombre de usuario ya existe.');
        return;
      }
      users[username] = { password };
      localStorage.setItem('users', JSON.stringify(users));
      
      // Crear una lista de tareas vacía para el nuevo usuario
      const tasks = JSON.parse(localStorage.getItem('tasks')) || {};
      tasks[username] = [];
      localStorage.setItem('tasks', JSON.stringify(tasks));

      onRegister(); // Llama a la función para cambiar a la vista de login
    } catch (err) {
      setError('Ocurrió un error al registrar el usuario.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Registro</h2>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
        <p>
          ¿Ya tienes una cuenta? <button type="button" onClick={switchToLogin} className="link-button">Inicia sesión</button>
        </p>
      </form>
    </div>
  );
};

export default Register;
