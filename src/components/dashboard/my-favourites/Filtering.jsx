import React, { useState } from 'react';

const Filtering = ({  onFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState('');

  const handleFilterChange = (e) => {
    const filterOption = e.target.value;
    setSelectedFilter(filterOption);
    onFilter(filterOption); // Pass the selected filter option to the parent component
  };

  return (
    <select
      className="selectpicker show-tick form-select c_select"
      value={selectedFilter}
      onChange={handleFilterChange}
    >
      <option value="">All</option>
      <option value="featured">Featured First</option>
      <option value="recent">Recent</option>
      <option value="old">Old Review</option>
    </select>
  );
};

export default Filtering;
