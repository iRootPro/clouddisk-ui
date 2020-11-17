import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store/store";
import {getFilesTC} from "../../reducers/fileReducer";
import FileList from "./FileList/FileList";
import styles from "./Disk.module.css"

const Disk = () => {
    const dispatch = useDispatch()
    const currentDir = useSelector<AppRootState, string>(state => state.files.currentDir)

    useEffect(() => {
        dispatch(getFilesTC(currentDir))
    }, [currentDir])

    return (
        <div className={styles.wrapper}>
            <div className='row'>
                <button className='btn blue darken-1' style={{marginRight: "5px"}}><i
                    className="material-icons">keyboard_backspace</i></button>
                <button className='btn blue darken-1'><i className="material-icons">create_new_folder</i></button>
            </div>
            <FileList/>
        </div>
    );
};

export default Disk
