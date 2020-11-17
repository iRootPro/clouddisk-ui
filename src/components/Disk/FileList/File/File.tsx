import React from 'react';

const File = (file: any) => {
    return (
        <tr>
            <td className="valign-wrapper"><i
                className="small material-icons">{file.file.type === 'dir' ? 'folder_open' : 'insert_drive_file'}</i>{file.file.name}
            </td>
            <td>{file.file.date.slice(0, 10)}</td>
            <td>{file.file.size}</td>
        </tr>
    );
};
export default File;
