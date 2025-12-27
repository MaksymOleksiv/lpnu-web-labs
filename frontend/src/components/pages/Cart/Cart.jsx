import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import CartItem from '../../common/CartItem/CartItem';
import { formatPrice } from '../../../utils/priceFormatter';
import style from './Cart.module.css';

const Cart = () => {
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector((state) => state.cart);

  const handleBackToCatalog = () => {
    navigate('/catalog');
  };

  const handleContinue = () => {
    alert('Proceeding to checkout...');
  };

  return (
    <div className={style.cartPage}>
      <Header />
      <main className={style.main}>
        <h1 className={style.title}>Shopping Cart</h1>
        
        {items.length === 0 ? (
          <div className={style.emptyCart}>
            <p>Your cart is empty</p>
            <button className={style.backButton} onClick={handleBackToCatalog}>
              Back to Catalog
            </button>
          </div>
        ) : (
          <>
            <div className={style.cartItems}>
              {items.map((item, index) => (
                <CartItem key={`${item.id}-${item.warrantyYears}-${index}`} item={item} />
              ))}
            </div>
            
            <div className={style.summary}>
              <div className={style.totalSection}>
                <span className={style.totalLabel}>Total amount:</span>
                <span className={style.totalAmount}>{formatPrice(totalAmount)}</span>
              </div>
              
              <div className={style.actions}>
                <button className={style.backButton} onClick={handleBackToCatalog}>
                  Back to Catalog
                </button>
                <button className={style.continueButton} onClick={handleContinue}>
                  Continue
                </button>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
