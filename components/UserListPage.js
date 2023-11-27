import React, { useState } from 'react';
import UserTable from './UserTable';
import UserFilters from './UserFilters';
import Pagination from './Pagination';
import styles from '../styles/UserListPage.module.css'

const UserListPage = () => {
  // State for search query and selected filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Number of users per page

  // Sample user data (replace with your data)
  const userData = [
    { id: 1, name: 'User 1', age: 25, gender: 'Male' },
    { id: 2, name: 'User 2', age: 30, gender: 'Female' },
    // Add more user data here
  ];

  // Filter and paginate user data
  const filteredUsers = userData
    .filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedFilters.length === 0 || selectedFilters.includes(user.gender))
    );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Function to change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.h1}>User List</h1>
      <UserFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <UserTable users={currentUsers} />
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={filteredUsers.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default UserListPage;
