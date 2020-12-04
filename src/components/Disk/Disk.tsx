import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store/store";
import {createDirTC, getFilesTC, setCurrentDirAC} from "../../reducers/fileReducer";
import FileList from "./FileList/FileList/FileList";
import styles from "./Disk.module.css"
import Modal from '../common/Modal/Modal';
import NewDir from "./NewDir/NewDir";
import Uploader from "../Uploader/Uploader";
import {fileAPI} from "../../api/cloudAPI";

const Disk = () => {
    const [popupCreateDir, setPopupCreateDir] = useState<boolean>(false)
    const [dragEnter, setDragEnter] = useState<boolean>(false)
    const dispatch = useDispatch()
    const currentDir = useSelector<AppRootState, any>(state => state.files.currentDir)
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


    function uploadFileHandler(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const files = [...event.target.files]
            files.forEach(file => dispatch(fileAPI.uploadFile(file, currentDir)))
        }

    }


    function onDragEnterHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function onDragLeaveHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(false)
    }

    function onDragOverHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
        event.stopPropagation()
        setDragEnter(true)
    }

    function onDropHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
        event.stopPropagation()
        const files = [...event.dataTransfer.files]
        files.forEach(file => dispatch(fileAPI.uploadFile(file, currentDir)))
        setDragEnter(false)
    }

    return (!dragEnter ?
            <div className={styles.wrapper}
                 onDragEnter={event => onDragEnterHandler(event)}
                 onDragLeave={event => onDragLeaveHandler(event)}
                 onDragOver={event => onDragOverHandler(event)}>
                <div className={styles.navigate}>
                    <div>
                        <button onClick={backDirHandler} className='btn blue darken-1' style={{marginRight: "5px"}}><i
                            className="material-icons">keyboard_backspace</i></button>
                    </div>
                    <div>
                        <button onClick={popupCreateDirHandler} className='btn blue darken-1'><i
                            className="material-icons">create_new_folder</i></button>
                    </div>
                    <div style={{marginLeft: "5px", marginBottom: "0px"}}>
                        <div className="btn blue darken-1">
                            <i className="material-icons">upload_file</i>
                            <input style={{opacity: "0", width: "0px"}} onChange={(event => uploadFileHandler(event))} type="file" multiple={true}/>
                        </div>
                    </div>
                </div>
                <FileList/>
                {popupCreateDir && <Modal modalActive={popupCreateDir} setModalActive={setPopupCreateDir}>
                    <div className="row">
                        <NewDir createDir={createDir}/>
                    </div>
                </Modal>}
                <Uploader/>
            </div>
            :
            <div>
                <div className={styles.dragdrop}
                     onDrop={event => onDropHandler(event)}
                     onDragEnter={event => onDragEnterHandler(event)}
                     onDragLeave={event => onDragLeaveHandler(event)}
                     onDragOver={event => onDragOverHandler(event)}>
                    <div className={styles.dragTitle}>
                        <i className="large material-icons">cloud_upload</i>
                        <span>Перетащите файлы сюда</span>
                    </div>
                </div>
            </div>

    );
};

export default Disk
