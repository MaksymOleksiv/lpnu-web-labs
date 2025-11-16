import React from "react";
import { Link } from "react-router-dom";
import style from "./Header.module.css";

const Header = () => {
    return (
        <header className={style.header}>
            <nav className={style.navbar}>
                <h1 className={style.title}><Link to="/">Laptop Shop</Link></h1>
                <ul className={style.navLinks}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/basket">Basket</Link></li>
                </ul>
                <div className={style.userActions}>
                    <button className={style.loginButton}>Login</button>
                    <button className={style.signupButton}>Sign Up</button>
                </div>
            </nav>
        </header>
    );
}

export default Header;
