import React from "react";
import style from "./Header.module.css";

const Header = () => {
    return (
        <header className={style.header}>
            <nav className={style.navbar}>
                <h1 className={style.title}>Laptop Shop</h1>
                <ul className={style.navLinks}>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Catalog</a></li>
                    <li><a href="#">Basket</a></li>
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
