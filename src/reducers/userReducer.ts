import {Dispatch} from "react";
import {authAPI, fileAPI} from "../api/cloudAPI";
import {log} from "util";
import {hideLoaderAC, showLoaderAC} from "./appReducer";

const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'

const initialState: initialStateType = {
    currentUser: {
        token: '',
        id: '',
        email: '',
        diskSpace: 0,
        usedSpace: 0,
        avatar: null
    },
    isLogged: false


}

export default function userReducer(state: initialStateType = initialState, action: ActionTypes) {
    switch (action.type) {
        case SET_USER:
            return {...state, currentUser: action.payload, isLogged: true}
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                currentUser: {
                    token: '',
                    id: '',
                    email: '',
                    diskSpace: 0,
                    usedSpace: 0,
                    avatar: null
                },
                isLogged: false
            }
        default:
            return state
    }
}

// actions

const setUserAC = (user: userType) => ({type: SET_USER, payload: user})
export const logoutAC = () => ({type: LOGOUT})

// thunks
export const registrationTC = (email: string, password: string) => (dispatch: Dispatch<any>) => {
    authAPI.registration(email, password)
        .then(res => {
            console.log(res)
        })
        .catch(e => console.error(e))
}

export const loginTC = (email: string, password: string) => (dispatch: Dispatch<any>) => {
    authAPI.login(email, password)
        .then(res => {
            dispatch(setUserAC(res.data.user))
            localStorage.setItem('token', res.data.token)
        })
        .catch(e => console.error(e))
}

export const authTC = () => (dispatch: Dispatch<any>) => {
    authAPI.auth()
        .then(res => {
            dispatch(setUserAC(res.data.user))
            localStorage.setItem('token', res.data.token)
        })
        .catch(e => localStorage.removeItem('token'))
}

export const uploadAvatarTC = (formData: any) => (dispatch: Dispatch<any>) => {
    showLoaderAC()
    fileAPI.uploadAvatar(formData)
        .then(res => {
            dispatch(setUserAC(res.data))
        })
        .catch(e => console.log(e))
        .finally(hideLoaderAC)
}

export const removeAvatarTC = () => (dispatch: Dispatch<any>) => {
    showLoaderAC()
    fileAPI.removeAvatar()
        .then(res => {
            dispatch(setUserAC(res.data))
        })
        .catch(e => console.log(e))
        .finally(hideLoaderAC)
}

// types
type initialStateType = {
    currentUser: userType,
    isLogged: boolean
}

export type userType = {
    token: string,
    id: string,
    email: string,
    diskSpace: number,
    usedSpace: number,
    avatar: string | null
}
type ActionTypes =
    | ReturnType<typeof setUserAC>
