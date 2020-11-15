const initialState: initialStateType = {
    token: '',
    id: '',
    email: '',
    diskSpace: 0,
    usedSpace: 0

}

export default function userReducer(state: initialStateType = initialState, action: ActionTypes) {
    switch (action.type) {
        default:
            return state
    }
}


// types
type initialStateType = {
    token: string,
    id: string,
    email: string,
    diskSpace: number,
    usedSpace: number
}
type ActionTypes = any
