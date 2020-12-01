import React from 'react';
import styles from './UploaderFile.module.css'
import {useDispatch} from "react-redux";
import {removeUploadFileAC} from "../../../reducers/uploadReducer";

const UploaderFile = (file: any) => {
    const dispatch = useDispatch()
    function removeFileUpload() {
        dispatch(removeUploadFileAC(file.file.id))
    }
    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.nameFile}>
                        {file.file.name}
                    </div>
                    <div>
                        <button onClick={removeFileUpload} className="btn-flat"><i className="tiny material-icons">close</i></button>
                    </div>
                </div>
                <div className={styles.progressBlock}>
                    <div className={styles.progressBar}>
                        <div className={styles.completed} style={{width: file.file.progress + '%'}}/>
                        <div className={styles.percent}>{file.file.progress}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UploaderFile;
