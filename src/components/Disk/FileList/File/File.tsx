import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteFileTC, pushToStackDirAC, setCurrentDirAC, viewFileType} from "../../../../reducers/fileReducer";
import {AppRootState} from "../../../../store/store";
import {downloadFile} from "../../../../api/cloudAPI";
import {sizeFormat} from "../../../../utils/sizeFormat";
import styles from "./File.module.css"

const File = (file: any) => {
    const currentDir = useSelector<AppRootState, any>(state => state.files.currentDir)
    const view = useSelector<AppRootState, viewFileType>(state => state.files.view)
    const dispatch = useDispatch()

    function openFolderHandler() {
        if (file.file.type === 'dir') {
            dispatch(setCurrentDirAC(file.file._id))
            dispatch(pushToStackDirAC(currentDir))
        }
    }

    function downloadHandler(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        downloadFile(file)
    }


    function deleteHandler(event: React.MouseEvent<HTMLButtonElement>) {
        event.stopPropagation()
        dispatch(deleteFileTC(file))
    }

    if (view === 'plate') {
        return (<div>
            <div onClick={openFolderHandler}>
                <div>
                    <div className={styles.plate}>
                       <div>
                           <i className="large material-icons">{file.file.type === 'dir' ? 'folder_open' : 'insert_drive_file'}</i>
                       </div>
                        <div>
                            {file.file.name}
                        </div>
                    </div>
                    {/*<div>*/}
                    {/*    {file.file.type !== 'dir' &&*/}
                    {/*    <button onClick={event => downloadHandler(event)} className="btn-flat"*/}
                    {/*            style={{marginRight: "5px"}}><i*/}
                    {/*        className="material-icons">file_download</i></button>}*/}
                    {/*    <button onClick={(event) => deleteHandler(event)} className="btn-flat"*/}
                    {/*            style={{marginRight: "10px"}}><i*/}
                    {/*        className="material-icons">delete</i></button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>)
    } else {
        return (
            <div className={styles.file} onClick={openFolderHandler}>
                <div className={styles.fileName}>
                    <div className={styles.fileName}>
                        <i className="small material-icons">{file.file.type === 'dir' ? 'folder_open' : 'insert_drive_file'}</i>
                        <div>
                            {file.file.name}
                        </div>
                    </div>
                    <div>
                        {file.file.type !== 'dir' &&
                        <button onClick={event => downloadHandler(event)} className="btn-flat"
                                style={{marginRight: "5px"}}><i
                            className="material-icons">file_download</i></button>}
                        <button onClick={(event) => deleteHandler(event)} className="btn-flat"
                                style={{marginRight: "10px"}}><i
                            className="material-icons">delete</i></button>
                    </div>
                </div>
                <div className={styles.date}>{file.file.date.slice(0, 10)}</div>
                <div className={styles.size}>{sizeFormat(file.file.size)}</div>
            </div>
        );
    }

};
export default File;

//types
type currentDirType = null | string
