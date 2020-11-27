import React from 'react';
import {useSelector} from "react-redux";
import File from "./File/File"
import {AppRootState} from "../../../store/store";

const FileList = () => {
    const files = useSelector<AppRootState, Array<any>>(state => state.files.files).map(file => <File
        key={file._id} file={file}/>)
    return (
        <div className="row">
            <table className="highlight">
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Дата</th>
                    <th>Размер</th>
                </tr>
                </thead>
                <tbody>
                {files}
                </tbody>
            </table>
        </div>
    )
};

export default FileList;
