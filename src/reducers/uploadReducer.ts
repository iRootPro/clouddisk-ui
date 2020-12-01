
const SHOW_UPLOADER = 'SHOW_UPLOADER'
const HIDE_UPLOADER = 'HIDE_UPLOADER'
const ADD_UPLOAD_FILE = 'ADD_UPLOAD_FILE'
const REMOVE_UPLOAD_FILE = 'REMOVE_UPLOAD_FILE'
const CHANGE_PERCENT_UPLOAD = 'CHANGE_PERCENT_UPLOAD'


const initialState: initialStateType = {
    isVisible: false,
    files: []
}


export default function uploadReducer(state: initialStateType = initialState, action: ActionTypes) {
    switch (action.type) {
        case SHOW_UPLOADER:
            return {...state, isVisible: true}
        case HIDE_UPLOADER:
            return {...state, isVisible: false}
        case ADD_UPLOAD_FILE:
            return {...state, files: [...state.files, action.payload]}
        case REMOVE_UPLOAD_FILE:
            return {
                ...state,
                files: [...state.files.filter(file => file.id !== action.payload)]
            }
        case CHANGE_PERCENT_UPLOAD:
            return {
                ...state,
                files: [...state.files.map(file => file.id === action.payload.id
                    ? {...file, progress: action.payload.progress}
                    : {...file}
                )]
            }
        default:
            return state
    }
}

// actions

export const showUploaderAC = () => ({type: SHOW_UPLOADER} as const)
export const hideUploaderAC = () => ({type: HIDE_UPLOADER} as const)
export const addUploadFileAC = (file: fileTypeUpload) => ({type: ADD_UPLOAD_FILE, payload: file} as const)
export const removeUploadFileAC = (fileId: string) => ({type: REMOVE_UPLOAD_FILE, payload: fileId} as const)
export const changePercentUploadAC = (file: fileTypeUpload) => ({type: CHANGE_PERCENT_UPLOAD, payload: file} as const)

// types
type initialStateType = {
    isVisible: boolean
    files: Array<fileTypeUpload>
}

type fileTypeUpload = {
    id: any
    name: string,
    progress: number
}

type ActionTypes =
    | ReturnType<typeof showUploaderAC>
    | ReturnType<typeof hideUploaderAC>
    | ReturnType<typeof addUploadFileAC>
    | ReturnType<typeof removeUploadFileAC>
    | ReturnType<typeof changePercentUploadAC>

