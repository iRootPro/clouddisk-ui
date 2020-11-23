import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store/store";
import {createDirTC, getFilesTC, setCurrentDirAC, uploadFileTC} from "../../reducers/fileReducer";
import FileList from "./FileList/FileList";
import styles from "./Disk.module.css"
import Modal from '../common/Modal/Modal';
import NewDir from "./NewDir/NewDir";

const Disk = () => {
    const [popupCreateDir, setPopupCreateDir] = useState<boolean>(false)
    const [dragEnter, setDragEnter] = useState<boolean>(false)
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


    function uploadFileHandler(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            const files = [...event.target.files]
            files.forEach(file => dispatch(uploadFileTC(file, currentDir)))
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
        files.forEach(file => dispatch(uploadFileTC(file, currentDir)))
        setDragEnter(false)
    }

    return (!dragEnter ?
        <div className={styles.wrapper}
             onDragEnter={event => onDragEnterHandler(event)}
             onDragLeave={event => onDragLeaveHandler(event)}
             onDragOver={event => onDragOverHandler(event)}>
            <div className='row'>
                <button onClick={backDirHandler} className='btn blue darken-1' style={{marginRight: "5px"}}><i
                    className="material-icons">keyboard_backspace</i></button>
                <button onClick={popupCreateDirHandler} className='btn blue darken-1'><i
                    className="material-icons">create_new_folder</i></button>
                <div className="file-field input-field">
                    <div className="btn blue darken-1">
                        <i className="material-icons">upload_file</i>
                        <input onChange={(event => uploadFileHandler(event))} type="file" multiple={true}/>
                    </div>
                </div>
            </div>
            <FileList/>
            {popupCreateDir && <Modal modalActive={popupCreateDir} setModalActive={setPopupCreateDir}>
                <div className="row">
                    <NewDir createDir={createDir}/>
                </div>
            </Modal>}
        </div>
            :
            <div className={styles.dragdrop}
                 onDrop={event => onDropHandler(event)}
                 onDragEnter={event => onDragEnterHandler(event)}
                 onDragLeave={event => onDragLeaveHandler(event)}
                 onDragOver={event => onDragOverHandler(event)}>Перетащите файлы сюда</div>
    );
};

export default Disk
