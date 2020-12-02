import React from 'react';
import {useSelector} from "react-redux";
import File from "./File/File"
import {AppRootState} from "../../../store/store";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import "./File/fileList.css"

const FileList = () => {
    const files = useSelector<AppRootState, Array<any>>(state => state.files.files)
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
                <TransitionGroup>
                    {files.map(file =>
                        <CSSTransition
                            key={file._id}
                            timeout={500}
                            classNames={'file'}
                            exit={false}
                        >
                            <File file={file}/>
                        </CSSTransition>
                    )}
                </TransitionGroup>
                </tbody>
            </table>
        </div>
    )
};

export default FileList;
