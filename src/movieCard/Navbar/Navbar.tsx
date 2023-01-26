import React from 'react';
import s from './Navbar.module.css'
import logo from '../images/dina.png'
import {Link} from "react-router-dom";

export const Navbar = () => {
    return (
        <div className={s.nav}>
            <input type="checkbox" id={s.navCheck}/>
            <div className={s.navHeader}>
                <div className={s.navTitle}>
                    <a href={'https://dinasem.github.io/Portfolio/#home'}>< img src={logo} className={s.logo}
                                                                                alt=""/></a>
                </div>
            </div>
            <div className={s.navBtn}>
                <label htmlFor={s.navCheck}>
                    <span></span>
                    <span></span>
                    <span></span>
                </label>
            </div>
            <div className={s.navLinks}>
                <Link to={{pathname: '/'}}>Home</Link>
                <Link to={{pathname: 'about/'}}>About project</Link>

            </div>
        </div>
    );
};

