import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';
import style from './ItemDetail.module.css';
import placeholderImage from '../../../assets/img/Default.png';
import CountableField from '../CountableField/CountableField';
import SelectableField from '../SelectableField/SelectableField';
import { formatPrice } from '../../../utils/priceFormatter';

const ItemDetail = ({ item }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { brand, model, price, cpu, ram, storage, imageUrl } = item;
    
    const [warrantyYears, setWarrantyYears] = useState(1);
    
    const WARRANTY_PRICE_PER_YEAR = 5000;
    
    const calculateTotalPrice = () => {
        return price + (warrantyYears * WARRANTY_PRICE_PER_YEAR);
    };

    const handleAddToCart = () => {
        dispatch(addToCart({ laptop: item, warrantyYears }));
        alert('Item added to cart!');
    };

    const displayImage = imageUrl || placeholderImage;
    const displayName = `${brand.name} ${model}`;
    const characteristics = [cpu, `${ram}GB RAM`, `${storage}GB Storage`];

    return (
        <div className={style.container}>
            <div className={style.imageContainer}>
                <img src={displayImage} alt={displayName} className={style.image} />
            </div>
            <div className={style.detailsContainer}>
                <div className={style.characteristics}>
                    {characteristics.map((char, index) => (
                        <span key={index} className={style.characteristicTag}>{char}</span>
                    ))}
                </div>
                <h1 className={style.title}>{displayName}</h1>
                <p className={style.description}>
                    High-performance laptop with {cpu} processor, {ram}GB of RAM, and {storage}GB storage.
                </p>
                
                <div className={style.fieldsContainer}>
                    <CountableField 
                        label="Warranty (Years)" 
                        initialValue={1} 
                        onChange={setWarrantyYears}
                    />
                    <SelectableField label="Color" options={['Space Gray', 'Silver']} />
                </div>

                <div className={style.footer}>
                    <span className={style.price}>Price: {formatPrice(calculateTotalPrice())}</span>
                    <div className={style.actions}>
                        <button className={style.backButton} onClick={() => navigate(-1)}>Go back</button>
                        <button className={style.cartButton} onClick={handleAddToCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
