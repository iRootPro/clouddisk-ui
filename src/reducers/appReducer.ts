const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'

const initialState: initialStateType = {
    loader: false
}

export default function appReducer(state: initialStateType = initialState, action: ActionTypes) {
    switch (action.type) {
        case SHOW_LOADER:
            return {...state, loader: true}
        case HIDE_LOADER:
            return {...state, loader: false}
        default:
            return state
    }
}

// actions

export const showLoaderAC = () => ({type: SHOW_LOADER} as const)
export const hideLoaderAC = () => ({type: HIDE_LOADER} as const)

type initialStateType = {
    loader: boolean
}


type ActionTypes =
    | ReturnType<typeof showLoaderAC>
    | ReturnType<typeof hideLoaderAC>

