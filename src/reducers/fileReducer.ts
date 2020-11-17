import {Dispatch} from "react";
import {fileAPI} from "../api/cloudAPI";
import {log} from "util";

const SET_FILES = 'SET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'

const initialState: initialStateType = {
    files: [],
    currentDir: null
}

export default function fileReducer(state: initialStateType = initialState, action: ActionTypes) {
    switch (action.type) {
        case SET_FILES:
            return {
                ...state,
                files: action.payload
            }
        case SET_CURRENT_DIR:
            return {
                ...state,
                currentDir: action.payload
            }
        default:
            return state
    }
}

// actions

export const setFilesAC = (files: Array<any>) => ({type: SET_FILES, payload: files})
export const setCurrentDir = (currentDir: null | string) => ({type: SET_FILES, payload: currentDir})

// thunks

export const getFilesTC = (dir: string) => (dispatch: Dispatch<any>) => {
    fileAPI.getFiles(dir)
        .then(res => {
            dispatch(setFilesAC(res.data))
        })
        .catch(e => console.log(e))
}

// types

type initialStateType = {
    files: Array<any>,
    currentDir: null | string
}
type ActionTypes = any
