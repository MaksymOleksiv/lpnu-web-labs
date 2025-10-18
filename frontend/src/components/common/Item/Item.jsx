import React from "react";
import style from "./Item.module.css";
import placeholderImage from "../../../assets/img/Default.png";

const Item = ({ item }) => {
    let { photo, name, description, price } = item;

    if (photo === "") {
        photo = placeholderImage;
    }

    return (
        <div className={style.item}>
            <img src={photo} alt={name} className={style.photo} />
            <h3 className={style.name}>{name}</h3>
            <p className={style.description}>{description}</p>
            <span className={style.price}>{price}</span>
            <button className={style.button}>Add to Cart</button>
        </div>
    );
}

export default Item;