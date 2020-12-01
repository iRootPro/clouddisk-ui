import React from 'react';
import styles from "./Uploader.module.css"
import UploaderFile from "./UploaderFile/UploaderFile";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store/store";
import {hideUploaderAC} from "../../reducers/uploadReducer";

const Uploader = () => {
    const isVisible = useSelector<AppRootState, boolean>(state => state.upload.isVisible)
    const files = useSelector<AppRootState, Array<any>>(state => state.upload.files)
    const dispatch = useDispatch()

    function closeUploaderHandler() {
        dispatch(hideUploaderAC())
    }
    return (isVisible ?
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.title}>
                    Загрузки
                </div>
                <div>
                    <button className="btn-flat" onClick={closeUploaderHandler}><i className="material-icons">close</i>
                    </button>
                </div>
            </div>
            {
                files.map(file => <UploaderFile key={file.id} file={file}/>)
            }
        </div> :
            <div>

            </div>
    );
};

export default Uploader;
