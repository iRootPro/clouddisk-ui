import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteFileTC, pushToStackDirAC, setCurrentDirAC} from "../../../../reducers/fileReducer";
import {AppRootState} from "../../../../store/store";
import {downloadFile} from "../../../../api/cloudAPI";

const File = (file: any) => {
    const currentDir = useSelector<AppRootState, string>(state => state.files.currentDir)
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

    return (
        <tr onClick={openFolderHandler}>
            <td className="row valign-wrapper">
                <div className="col s12 valign-wrapper">
                    <i className="small material-icons">{file.file.type === 'dir' ? 'folder_open' : 'insert_drive_file'}</i>{file.file.name}
                </div>
                {file.file.type !== 'dir' &&
                <button onClick={event => downloadHandler(event)} className="btn-flat" style={{marginRight: "5px"}}><i
                    className="material-icons">file_download</i></button>}
                <button onClick={(event) => deleteHandler(event)} className="btn-flat" style={{marginRight: "10px"}}><i
                    className="material-icons">delete</i></button>
            </td>
            <td>{file.file.date.slice(0, 10)}</td>
            <td>{file.file.size}</td>
        </tr>
    );
};
export default File;
