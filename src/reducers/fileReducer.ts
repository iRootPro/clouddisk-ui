import {Dispatch} from "react";
import {fileAPI} from "../api/cloudAPI";
import {hideLoaderAC, showLoaderAC} from "./appReducer";

const SET_FILES = 'SET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
const ADD_FILE = 'ADD_FiLE'
const PUSH_TO_STACK_DIR = 'PUSH_TO_STACK_DIR'
const POP_FROM_STACK_DIR = 'POP_FROM_STACK_DIR'
const DELETE_FILE = 'DELETE_FILE'

const initialState: initialStateType = {
    files: [],
    currentDir: null,
    stackDir: []
}

export default function fileReducer(state: initialStateType = initialState, action: ActionTypes) {
    switch (action.type) {
        case SET_FILES:
            return {...state, files: action.payload}
        case SET_CURRENT_DIR:
            return {...state, currentDir: action.payload}
        case ADD_FILE:
            return {...state, files: [...state.files, action.payload]}
        case PUSH_TO_STACK_DIR:
            return {...state, stackDir: [...state.stackDir, action.payload]}
        case DELETE_FILE:
            return {...state, files: [...state.files.filter(file => file._id !== action.payload)]}
        default:
            return state
    }
}

// actions

export const setFilesAC = (files: Array<any>) => ({type: SET_FILES, payload: files} as const)
export const setCurrentDirAC = (currentDir: null | string) => ({type: SET_CURRENT_DIR, payload: currentDir} as const)
export const addFileAC = (file: any) => ({type: ADD_FILE, payload: file} as const)
export const pushToStackDirAC = (dir: any) => ({type: PUSH_TO_STACK_DIR, payload: dir} as const)
export const popFromStackDirAC = (dir: string) => ({type: POP_FROM_STACK_DIR, payload: dir} as const)
export const deleteFileAC = (id: string) => ({type: DELETE_FILE, payload: id} as const)

// thunks

export const getFilesTC = (dir: string, sort: string) => (dispatch: Dispatch<any>) => {
    dispatch(showLoaderAC())
    fileAPI.getFiles(dir, sort)
        .then(res => {
            dispatch(setFilesAC(res.data))
        })
        .catch(e => console.log(e))
        .finally(() => {
            dispatch(hideLoaderAC())
        })
}

export const createDirTC = (name: string, dirId: string) => (dispatch: Dispatch<any>) => {
    fileAPI.createDir(name, dirId)
        .then(res => {
            dispatch(addFileAC(res.data))
        })
        .catch(e => console.log(e))
}

export const deleteFileTC = (file: any) => (dispatch: Dispatch<any>) => {
    fileAPI.deleteFile(file)
        .then(res => {
            dispatch(deleteFileAC(file.file._id))
        })
        .catch(e => console.log(e))
}

export const searchFileTC = (value: string) => (dispatch: Dispatch<any>) => {
    fileAPI.searchFile(value)
        .then(res => {
            dispatch(setFilesAC(res.data))
        })
        .catch(e => console.log(e))
}

// types

type initialStateType = {
    files: Array<fileType>
    currentDir: null | string
    stackDir: Array<string>
}

export type fileType = {
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
    | ReturnType<typeof pushToStackDirAC>
    | ReturnType<typeof popFromStackDirAC>
    | ReturnType<typeof deleteFileAC>

