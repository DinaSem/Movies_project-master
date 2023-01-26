import React from 'react';
import s from './Footer.module.css'
import logo from "../images/dina.png";
import logoGit from "../images/github_logo.png";
import logoTelega from "../images/logo_telegram.png";

export const Footer = () => {
    return (
            <div className={s.nav}>
                {/*<nav>*/}
                {/*    <Link to={{pathname:'/'}}>Главная</Link>*/}
                {/*    <Link to={'/404'}>Ошибка</Link>*/}
                {/*</nav>*/}
                <input type="checkbox" id={s.navCheck}/>
                    <div className={s.navHeader}>
                        <div className={s.navTitle}>
                            <a href={'https://dinasem.github.io/Portfolio/#home'}>< img src={logo} className={s.logo} alt=""/></a>
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
                        <a href={'https://github.com/DinaSem'}>< img src={logoGit} className={s.logo} alt=""/></a>
                        <a href={'https://t.me/DinaSem'}>< img src={logoTelega} className={s.logo} alt=""/></a>
                        {/*<a href="http://stackoverflow.com/users/4084003/" target="_blank">Stackoverflow</a>*/}
                        {/*<a href="https://in.linkedin.com/in/jonesvinothjoseph" target="_blank">LinkedIn</a>*/}
                        {/*<a href="https://codepen.io/jo_Geek/" target="_blank">Codepen</a>*/}
                        {/*<a href="https://jsfiddle.net/user/jo_Geek/" target="_blank">JsFiddle</a>*/}
                    </div>
            </div>

    );
};

