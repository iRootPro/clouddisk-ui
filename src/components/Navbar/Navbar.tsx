import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './navbar.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../store/store";
import {logoutAC} from "../../reducers/userReducer";
import {API_URL} from "../../utils/config";

const Navbar = () => {
    const isLogged = useSelector<AppRootState, boolean>(state => state.user.isLogged)
    const currentUser = useSelector<AppRootState, any>(state => state.user.currentUser)
    const dispatch = useDispatch()
    const logoutHandler = () => {
        dispatch(logoutAC())
    }
    return (
        <div>
            <nav className={styles.navbar}>
                <div>
                    <NavLink to={"/"}>
                        <div className={styles.logo}>
                            <i className="material-icons" style={{marginLeft: "20px", marginRight: "20px"}}>cloud</i><span className={styles.logoText}>Cloud Disk</span>
                        </div>
                    </NavLink>
                </div>
                <div className={styles.account}>
                    {!isLogged && <div style={{marginRight: "20px"}}><NavLink to={'/login'}>Войти</NavLink></div>}
                    {!isLogged &&
                    <div style={{marginRight: "20px"}}><NavLink to={'/registration'}>Регистрация</NavLink></div>}
                    <div className={styles.profile}>
                        <div>
                            {isLogged && <NavLink to={"/profile"}>
                                {currentUser.avatar ? <img src={API_URL + '/' + currentUser.avatar} width="34px" style={{borderRadius: "50%", marginTop: "20px"}}/> :
                                    <i className="material-icons" style={{cursor: "pointer", marginRight: "10px"}}>account_circle</i>}
                            </NavLink>}
                        </div>
                        <div>
                            {isLogged && <div style={{marginRight: "20px", cursor: "pointer"}} onClick={logoutHandler}>Выйти</div>}
                        </div>

                    </div>

                </div>
            </nav>
        </div>
    );
};

export default Navbar;
