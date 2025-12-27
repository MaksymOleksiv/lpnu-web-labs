import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import ItemDetail from '../../common/ItemDetail/ItemDetail';
import Spinner from '../../common/Spinner/Spinner';
import style from './ItemPage.module.css';
import { laptopApi } from '../../../api/laptopApi';

const ItemPage = () => {
    const { id } = useParams();
    const [laptop, setLaptop] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        laptopApi.getLaptopById(id)
            .then(data => {
                setLaptop(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    return (
        <div className={style.itemPage}>
            <Header />
            <main className={style.main}>
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <div className={style.error}>Error: {error}</div>
                ) : !laptop ? (
                    <div className={style.error}>Laptop not found</div>
                ) : (
                    <ItemDetail item={laptop} />
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ItemPage;
