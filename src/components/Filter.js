import React from 'react';

const Filter = ({ setSearchTerm, setPriorityFilter }) => {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Buscar por título o descripción..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select onChange={(e) => setPriorityFilter(e.target.value)}>
        <option value="">Todas las prioridades</option>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
    </div>
  );
};

export default Filter;
