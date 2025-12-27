import React from "react";
import { Link } from "react-router-dom";
import style from "./Item.module.css";
import placeholderImage from "../../../assets/img/Default.png";
import { formatPrice } from "../../../utils/priceFormatter";

const Item = ({ item }) => {
    const { id, brand, model, price, cpu, ram, storage, imageUrl } = item;
    
    const displayImage = imageUrl || placeholderImage;
    const displayName = `${brand.name} ${model}`;
    const displayDescription = `${cpu} | ${ram}GB RAM | ${storage}GB Storage`;

    return (
        <div className={style.item}>
            <img src={displayImage} alt={displayName} className={style.photo} />
            <h3 className={style.name}>{displayName}</h3>
            <p className={style.description}>{displayDescription}</p>
            <span className={style.price}>{formatPrice(price)}</span>
            <Link to={`/item/${id}`} className={style.linkButton}>
                <button className={style.button}>View Details</button>
            </Link>
        </div>
    );
}

export default Item;