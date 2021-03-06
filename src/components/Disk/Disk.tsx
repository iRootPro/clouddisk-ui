import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store/store";
import {
    createDirTC,
    getFilesTC,
    searchFileTC,
    setCurrentDirAC,
    setFileViewAC,
    viewFileType
} from "../../reducers/fileReducer";
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
    const loader = useSelector<AppRootState, boolean>(state => state.app.loader)
    const [sort, setSort] = useState('type')
    const [searchName, setSearchName] = useState<string>('')
    const [searchTimeout, setSearchTimeout] = useState<any>(false)

    useEffect(() => {
        dispatch(getFilesTC(currentDir, sort))
    }, [currentDir, sort])

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

    if (loader) {
        return (
            <div className={styles.loaderWrapper}>
                <div className={styles.loader}></div>
            </div>

        )
    }

    function searchNameHandler(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearInterval(searchTimeout)
        }
        if (e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFileTC(value))
            }, 500, e.target.value))
        } else {
            dispatch(getFilesTC(currentDir, sort))
        }


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
                    <div style={{marginLeft: "5px"}}>
                        <div className="btn blue darken-1 file-field input-field">
                            <input onChange={(event => uploadFileHandler(event))} type="file"
                                   multiple={true}/>
                            <i className="material-icons">upload_file</i>
                        </div>
                    </div>
                    <div style={{marginLeft: "5px"}}>
                        <span className={styles.sort}>Сортировка по:</span>
                    </div>
                    <div>
                        <button onClick={() => setSort('type')} className='btn blue darken-1'
                                style={{marginLeft: "5px"}}>типу
                        </button>
                    </div>
                    <div>
                        <button onClick={() => setSort('name')} className='btn blue darken-1'
                                style={{marginLeft: "5px"}}>имени
                        </button>
                    </div>
                    <div>
                        <button onClick={() => setSort('date')} className='btn blue darken-1'
                                style={{marginLeft: "5px"}}>дате
                        </button>
                    </div>
                    <div style={{marginLeft: "5px"}}>
                        <input type="text" placeholder="Название файла" className={styles.search} value={searchName}
                               onChange={(e) => searchNameHandler(e)}/>
                    </div>
                </div>
                <div className={styles.view}>
                    <div onClick={() => dispatch(setFileViewAC('list'))}><i className="material-icons" style={{cursor: "pointer"}}>list</i></div>
                    <div onClick={() => dispatch(setFileViewAC('plate'))}><i className="material-icons" style={{cursor: "pointer"}}>apps</i></div>
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
