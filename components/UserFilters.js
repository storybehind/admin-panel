import React from 'react';
import styles from '../styles/UserFilters.module.css'

const UserFilters = ({ searchQuery, setSearchQuery, selectedFilters, setSelectedFilters }) => {
  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = event => {
    const selectedValue = event.target.value;
    setSelectedFilters(prevFilters => {
      if (prevFilters.includes(selectedValue)) {
        return prevFilters.filter(filter => filter !== selectedValue);
      } else {
        return [...prevFilters, selectedValue];
      }
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users"
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.input}
      />
      <label className={styles.label}>
        Filter by Gender:
        <select value={selectedFilters} onChange={handleFilterChange} className={styles.select}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
    </div>
  );
};

export default UserFilters;
