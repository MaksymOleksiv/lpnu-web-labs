import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Search from "../../layout/Search/Search";
import Filter from "../../layout/Filter/Filter";
import Item from "../../common/Item/Item";
import style from "./Catalog.module.css";

function Catalog() {
    const items = [
        { photo: "", name: "Laptop A", description: "Description for Laptop A", price: "$500" },
        { photo: "", name: "Laptop B", description: "Description for Laptop B", price: "$700" },
        { photo: "", name: "Laptop C", description: "Description for Laptop C", price: "$900" },
        { photo: "", name: "Laptop D", description: "Description for Laptop D", price: "$1100" },
        { photo: "", name: "Laptop E", description: "Description for Laptop E", price: "$1300" },
        { photo: "", name: "Laptop F", description: "Description for Laptop F", price: "$1500" },
        { photo: "", name: "Laptop G", description: "Description for Laptop G", price: "$1700" },
        { photo: "", name: "Laptop H", description: "Description for Laptop H", price: "$1900" },
        { photo: "", name: "Laptop I", description: "Description for Laptop I", price: "$2100" },
    ];

    return (
        <div className={style.catalogPage}>
            <Header />
            <main className={style.catalog}>
                <h2 className={style.title}>Catalog Page</h2>
                <Search />
                <Filter />
                <div className={style.itemList}>
                    {items.map((item, index) => (
                        <Item key={index} item={item} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Catalog;