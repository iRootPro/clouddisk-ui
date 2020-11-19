import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {pushToStackDirAC, setCurrentDirAC} from "../../../../reducers/fileReducer";
import {AppRootState} from "../../../../store/store";

const File = (file: any) => {
    const currentDir = useSelector<AppRootState, string>(state => state.files.currentDir)
    const dispatch = useDispatch()

    function openFolderHandler() {
        if (file.file.type === 'dir') {
            dispatch(setCurrentDirAC(file.file._id))
            dispatch(pushToStackDirAC(currentDir))
        }
    }

    return (
        <tr onClick={openFolderHandler}>
            <td className="valign-wrapper"><i
                className="small material-icons">{file.file.type === 'dir' ? 'folder_open' : 'insert_drive_file'}</i>{file.file.name}
            </td>
            <td>{file.file.date.slice(0, 10)}</td>
            <td>{file.file.size}</td>
        </tr>
    );
};
export default File;
