// Layout.js
import React from 'react';
import styles from '../styles/Layout.module.css'; // Import your CSS module for styling
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    return (
        <div className={styles.layout}>
          <Sidebar />
          <main className={styles.main}>{children}</main>
        </div>
    );
};

export default Layout;
