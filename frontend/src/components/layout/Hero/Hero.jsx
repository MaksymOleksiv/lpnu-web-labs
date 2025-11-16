import React from "react";
import { Link } from "react-router-dom";
import style from "./Hero.module.css";

const Hero = () => {
    return (
        <section className={style.hero}>
            <div className={style.content}>
                <h2 className={style.title}>Find Your Perfect Laptop</h2>
                <p className={style.subtitle}>Discover the best laptops for your needs.</p>
                <Link to="/catalog" className={style.button}>Move to Catalog <span>→</span></Link>
            </div>
        </section>);
};

export default Hero;

