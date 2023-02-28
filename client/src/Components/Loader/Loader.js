import React from 'react';
import styles from "./Loader.module.css";

const Loader = () => {
    return (
        <div className={styles.container}>
            <div className="lds-dual-ring"></div>
        </div>
    );
};

export default Loader;