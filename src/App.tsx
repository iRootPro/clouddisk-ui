import React, {useEffect} from 'react';
import Navbar from "./components/Navbar/Navbar";
import styles from "./app.module.css"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";
import {authTC} from "./reducers/userReducer";

function App() {
    const isLogged = useSelector<AppRootState, boolean>(state => state.user.isLogged)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(authTC())
    }, [])

    return (
        <BrowserRouter>
            <div className={styles.app}>
                <Navbar/>
                {!isLogged &&
                <Switch>
                    <Route path={"/registration"} component={Registration}/>
                    <Route path={"/login"} component={Login}/>
                </Switch>
                }
            </div>
        </BrowserRouter>

    );
}

export default App;
