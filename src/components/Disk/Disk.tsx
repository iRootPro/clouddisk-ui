import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store/store";
import {createDirTC, getFilesTC, setCurrentDirAC} from "../../reducers/fileReducer";
import FileList from "./FileList/FileList";
import styles from "./Disk.module.css"
import Modal from '../common/Modal/Modal';
import NewDir from "./NewDir/NewDir";

const Disk = () => {
    const [popupCreateDir, setPopupCreateDir] = useState<boolean>(false)
    const dispatch = useDispatch()
    const currentDir = useSelector<AppRootState, string>(state => state.files.currentDir)
    const stackDir = useSelector<AppRootState, Array<string>>(state => state.files.stackDir)

    useEffect(() => {
        dispatch(getFilesTC(currentDir))
    }, [currentDir])

    const popupCreateDirHandler = () => {
        setPopupCreateDir(true)
    }

    const createDir = (name: string) => {
        dispatch(createDirTC(name, currentDir))
        setPopupCreateDir(false)
    }

    function backDirHandler() {
        const backDir = stackDir.pop()
        if (backDir) {
            dispatch(setCurrentDirAC(backDir))
        } else {
            dispatch(setCurrentDirAC(null))
        }

    }

    return (
        <div className={styles.wrapper}>
            <div className='row'>
                <button onClick={backDirHandler} className='btn blue darken-1' style={{marginRight: "5px"}}><i
                    className="material-icons">keyboard_backspace</i></button>
                <button onClick={popupCreateDirHandler} className='btn blue darken-1'><i
                    className="material-icons">create_new_folder</i></button>
            </div>
            <FileList/>
            {popupCreateDir && <Modal modalActive={popupCreateDir} setModalActive={setPopupCreateDir}>
                <div className="row">
                    <NewDir createDir={createDir}/>
                </div>
            </Modal>}
        </div>
    );
};

export default Disk
