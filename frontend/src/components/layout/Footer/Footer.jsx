import React from "react";
import style from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.socialMedia}>
                    <a href="#" className={style.icon}><FaFacebook /></a>
                    <a href="#" className={style.icon}><FaInstagram /></a>
                    <a href="#" className={style.icon}><FaTwitter /></a>
                    <a href="#" className={style.icon}><FaLinkedin /></a>
                </div>
                <p className={style.text}>© 2025 Your Company. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
