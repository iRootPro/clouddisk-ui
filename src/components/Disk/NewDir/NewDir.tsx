import React, {useState} from 'react';

const NewDir = ({createDir}: propsType) => {
    const [nameDir, setNameDir] = useState<string>('')

    function createDirButtonHandler() {
        createDir(nameDir)
        setNameDir('')
    }

    return (
        <div>
            <h3>Создать новую папку</h3>
            <div className="input-field col s12">
                <i className="material-icons prefix">folder</i>
                <input id="nameDir" type="text" name="nameDir" value={nameDir}
                       onChange={(e) => setNameDir(e.currentTarget.value)}/>
            </div>
            <div className="col s12">
                <button onClick={createDirButtonHandler} type="submit" className="blue darken-1 btn">Создать</button>
            </div>
        </div>

    );
};

export default NewDir;

// types

type propsType = {
    createDir: (name: string) => void
}
