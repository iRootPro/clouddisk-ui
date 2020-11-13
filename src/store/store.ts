import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import userReducer from "../reducers/userReducer";
import fileReducer from "../reducers/fileReducer";

const rootReducers = combineReducers({
    user: userReducer,
    files: fileReducer
})

export const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)))



// types
export type AppRootState = ReturnType<typeof rootReducers>
