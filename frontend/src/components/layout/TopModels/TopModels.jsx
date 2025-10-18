import React from "react";
import style from "./TopModels.module.css";
import Item from "../../common/Item/Item";

const TopModels = () => {
    return (
        <section className={style.topModels}>
            <h2 className={style.title}>Top Laptop Models</h2>
            <div className={style.modelList}>
                <Item item={{ photo: "", name: "Laptop 1", description: "High performance laptop", price: "$999" }} />
                <Item item={{ photo: "", name: "Laptop 2", description: "Lightweight and portable", price: "$799" }} />
                <Item item={{ photo: "", name: "Laptop 3", description: "Best for gaming", price: "$1299" }} />
            </div>
            <button className={style.button}>View More</button>
        </section>
    );
};

export default TopModels;
