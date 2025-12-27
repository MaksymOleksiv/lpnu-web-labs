import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./Header.module.css";

const Header = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className={style.header}>
            <nav className={style.navbar}>
                <h1 className={style.title}><Link to="/">Laptop Shop</Link></h1>
                <ul className={style.navLinks}>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li className={style.cartLink}>
                        <Link to="/cart">
                            Cart
                            {totalItems > 0 && (
                                <span className={style.cartBadge}>{totalItems}</span>
                            )}
                        </Link>
                    </li>
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
