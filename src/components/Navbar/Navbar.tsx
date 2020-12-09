import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './navbar.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store/store";
import {logoutAC} from "../../reducers/userReducer";

const Navbar = () => {
    const isLogged = useSelector<AppRootState, boolean>(state => state.user.isLogged)
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logoutAC())
    }
    return (
        <div className={styles.navbar}>
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <ul>
                        <li className={styles.logo}>
                            <a href="/" className="brand-logo"><i className="material-icons">cloud</i>Cloud Disk</a>
                        </li>

                    </ul>

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {!isLogged && <li><NavLink to={'/login'}>Войти</NavLink></li>}
                        {!isLogged && <li><NavLink to={'/registration'}>Регистрация</NavLink></li>}
                        {isLogged && <li style={{marginRight: "5px"}} onClick={logoutHandler}>Выйти</li>}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
