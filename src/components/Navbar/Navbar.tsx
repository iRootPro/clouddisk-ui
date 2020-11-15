import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './navbar.module.css'

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <nav>
                <div className="nav-wrapper blue darken-1">
                    <ul>
                        <li className={styles.logo}>
                            <a href="#!" className="brand-logo"><i className="material-icons">cloud</i>Cloud Disk</a>
                        </li>
                    </ul>

                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to={'/login'}>Войти</NavLink></li>
                        <li><NavLink to={'/registration'}>Регистрация</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
