import React from 'react';
import styles from '../styles/Pagination.module.css'

const Pagination = ({ usersPerPage, totalUsers, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.ul}>
      {pageNumbers.map(number => (
        <li key={number} className={styles.li}>
          <button
            onClick={() => paginate(number)}
            // className={number === currentPage ? 'active' : ''}
            className={`${number == currentPage ? 'active' : ''} ${styles.button}`}
          >
            {number}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
