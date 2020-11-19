import {Dispatch} from "react";
import {fileAPI} from "../api/cloudAPI";

const SET_FILES = 'SET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
const ADD_FILE = 'ADD_FiLE'
const PUSH_TO_STACK_DIR = 'PUSH_TO_STACK_DIR'
const POP_FROM_STACK_DIR = 'POP_FROM_STACK_DIR'

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
        default:
            return state
    }
}

// actions

export const setFilesAC = (files: Array<any>) => ({type: SET_FILES, payload: files})
export const setCurrentDirAC = (currentDir: null | string) => ({type: SET_CURRENT_DIR, payload: currentDir})
export const addFileAC = (file: any) => ({type: ADD_FILE, payload: file})
export const pushToStackDirAC = (dir: string) => ({type: PUSH_TO_STACK_DIR, payload: dir})
export const popFromStackDirAC = (dir: string) => ({type: POP_FROM_STACK_DIR, payload: dir})

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
    files: Array<fileType>
    currentDir: null | string
    stackDir: Array<string>
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
    | ReturnType<typeof pushToStackDirAC>
    | ReturnType<typeof popFromStackDirAC>

