import React from 'react';
import Navbar from "./components/Navbar/Navbar";
import styles from "./app.module.css"
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Registration from "./components/Registration/Registration";

function App() {
    return (
        <BrowserRouter>
            <div className={styles.app}>
                <Navbar/>
                <Switch>
                    <Route path={"/registration"} component={Registration}/>
                </Switch>
            </div>
        </BrowserRouter>

    );
}

export default App;
