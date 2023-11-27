import React from 'react';
import styles from '../styles/UserTable.module.css'

const UserTable = ({ users }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>ID</th>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Age</th>
          <th className={styles.th}>Gender</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td className={styles.td}>{user.id}</td>
            <td className={styles.td}>{user.name}</td>
            <td className={styles.td}>{user.age}</td>
            <td className={styles.td}>{user.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
