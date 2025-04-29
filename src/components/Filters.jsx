import React from 'react';

const Filters = ({ setFilter }) => {
  return (
    <div>
      <select className='select-filter'
        id="filter"
        name="filter"
        onChange={(e) => setFilter(e.target.value)}
      >
        <option value="select-filter">Select Filter</option>
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="pending">Pending</option>
        <option value="inprogress">In Progress</option>
      </select>
    </div>
  );
};

export default Filters; 
