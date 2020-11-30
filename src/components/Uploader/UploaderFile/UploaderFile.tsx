import React from 'react';
import styles from './UploaderFile.module.css'

const UploaderFile = () => {
    return (
        <>
            <div className={styles.wrapper}>
                <div>
                    uploadFile
                </div>
                <div className={styles.progressBlock}>
                    <div className={styles.progressBar}>
                        <div className={styles.completed} style={{width: "70%"}}/>
                        <div className={styles.percent}>0%</div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default UploaderFile;
