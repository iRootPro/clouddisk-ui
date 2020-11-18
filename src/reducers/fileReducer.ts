import {Dispatch} from "react";
import {fileAPI} from "../api/cloudAPI";
import {type} from "os";

const SET_FILES = 'SET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
const ADD_FILE = 'ADD_FiLE'

const initialState: initialStateType = {
    files: [],
    currentDir: null
}

export default function fileReducer(state: initialStateType = initialState, action: ActionTypes) {
    switch (action.type) {
        case SET_FILES:
            return {...state, files: action.payload}
        case SET_CURRENT_DIR:
            return {...state, currentDir: action.payload}
        case ADD_FILE:
            return {...state, files: [...state.files, action.payload]}
        default:
            return state
    }
}

// actions

export const setFilesAC = (files: Array<any>) => ({type: SET_FILES, payload: files})
export const setCurrentDirAC = (currentDir: null | string) => ({type: SET_CURRENT_DIR, payload: currentDir})
export const addFileAC = (file: any) => ({type: ADD_FILE, payload: file})

// thunks

export const getFilesTC = (dir: string) => (dispatch: Dispatch<any>) => {
    fileAPI.getFiles(dir)
        .then(res => {
            dispatch(setFilesAC(res.data))
        })
        .catch(e => console.log(e))
}

export const createDirTC = (name: string, dirId: string) => (dispatch: Dispatch<any>) => {
    fileAPI.createDir(name, dirId)
        .then(res => {
            dispatch(addFileAC(res.data))
        })
        .catch(e => console.log(e))
}

// types

type initialStateType = {
    files: Array<fileType>,
    currentDir: null | string
}

type fileType = {
    childs: Array<any>
    date: string
    name: string
    path: string
    size: number
    type: string
    user: string
    __v: number
    _id: string
}
type ActionTypes =
    | ReturnType<typeof setFilesAC>
    | ReturnType<typeof setCurrentDirAC>
    | ReturnType<typeof addFileAC>

