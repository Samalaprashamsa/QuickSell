
import React from 'react';
import './Filter.css';

const Filter = ({ setGroupingOption, setOrderingOption }) => {
  const handleGroupingChange = (e) => {
    setGroupingOption(e.target.value);
  };

  const handleOrderingChange = (e) => {
    setOrderingOption(e.target.value);
  };

  return (
    <div className="filter">
      <label>Display: </label>

      
      <select onChange={(e) => handleGroupingChange(e)}>
        <option value="group-status">Group by Status</option>
        <option value="group-user">Group by User</option>
        <option value="group-priority">Group by Priority</option>
      </select>

      
      <select onChange={(e) => handleOrderingChange(e)}>
        <option value="order-priority">Order by Priority</option>
        <option value="order-title">Order by Title</option>
      </select>
    </div>
  );
};

export default Filter;
