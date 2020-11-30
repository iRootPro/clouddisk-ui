import React from 'react';
import styles from "./Uploader.module.css"
import UploaderFile from "./UploaderFile/UploaderFile";

const Uploader = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.title}>
                    Загрузки
                </div>
                <div>
                    <button className="btn-flat"><i className="material-icons">close</i></button>
                </div>
            </div>
            <UploaderFile/>
        </div>
    );
};

export default Uploader;
