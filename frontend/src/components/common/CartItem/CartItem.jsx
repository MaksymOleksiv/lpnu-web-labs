import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../../../store/cartSlice';
import { formatPrice } from '../../../utils/priceFormatter';
import style from './CartItem.module.css';
import placeholderImage from '../../../assets/img/Default.png';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementQuantity({ id: item.id, warrantyYears: item.warrantyYears }));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity({ id: item.id, warrantyYears: item.warrantyYears }));
  };

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from cart?')) {
      dispatch(removeFromCart({ id: item.id, warrantyYears: item.warrantyYears }));
    }
  };

  const displayImage = item.imageUrl || placeholderImage;
  const displayName = `${item.brand.name} ${item.model}`;

  return (
    <div className={style.cartItem}>
      <img src={displayImage} alt={displayName} className={style.image} />
      <div className={style.info}>
        <h3 className={style.name}>{displayName}</h3>
        <p className={style.specs}>
          {item.cpu} | {item.ram}GB RAM | {item.storage}GB | Warranty: {item.warrantyYears}y
        </p>
      </div>
      <div className={style.controls}>
        <button 
          className={style.button} 
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className={style.quantity}>{item.quantity}</span>
        <button className={style.button} onClick={handleIncrement}>
          +
        </button>
      </div>
      <div className={style.price}>
        {formatPrice(item.totalPrice)}
      </div>
      <button className={style.removeButton} onClick={handleRemove} title="Remove from cart">
        ✕
      </button>
    </div>
  );
};

export default CartItem;
