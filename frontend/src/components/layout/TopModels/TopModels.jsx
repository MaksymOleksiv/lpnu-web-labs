import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./TopModels.module.css";
import Item from "../../common/Item/Item";
import Spinner from "../../common/Spinner/Spinner";
import { laptopApi } from "../../../api/laptopApi";

const TopModels = () => {
    const [topLaptops, setTopLaptops] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        laptopApi.getAllLaptops()
            .then(data => {
                const top3 = data.slice(0, 3);
                setTopLaptops(top3);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch laptops:', err);
                setLoading(false);
            });
    }, []);

    return (
        <section className={style.topModels}>
            <h2 className={style.title}>Top Laptop Models</h2>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className={style.modelList}>
                        {topLaptops.map(laptop => (
                            <Item key={laptop.id} item={laptop} />
                        ))}
                    </div>
                    <Link to="/catalog" className={style.button}>View More</Link>
                </>
            )}
        </section>
    );
};

export default TopModels;
