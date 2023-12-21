import React, { useState } from 'react';
import styles from '../styles/Tipbar.module.css';

const TipBar = ({ message, onClose }) => {
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
    onClose();
  };

  return (
    !isClosed && (
      <div className={styles.tipbar}>
        <span>{message}</span>
        <button onClick={handleClose} className={styles.closeButton}>
            &times;
        </button>
      </div>
    )
  );
};

export default TipBar;