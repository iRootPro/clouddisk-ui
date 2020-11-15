import {Dispatch} from "react";
import {authAPI} from "../api/cloudAPI";

const SET_USER = 'SET_USER'
const LOGOUT = 'LOGOUT'

const initialState: initialStateType = {
    currentUser: {
        token: '',
        id: '',
        email: '',
        diskSpace: 0,
        usedSpace: 0
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
                    usedSpace: 0
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

// types
type initialStateType = {
    currentUser: userType,
    isLogged: boolean
}

type userType = {
    token: string,
    id: string,
    email: string,
    diskSpace: number,
    usedSpace: number
}
type ActionTypes =
    | ReturnType<typeof setUserAC>
