import { useState, useEffect } from "react";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/Footer/Footer";
import Search from "../../layout/Search/Search";
import Filter from "../../layout/Filter/Filter";
import Item from "../../common/Item/Item";
import Spinner from "../../common/Spinner/Spinner";
import style from "./Catalog.module.css";
import { laptopApi } from "../../../api/laptopApi";

function Catalog() {
    const [laptops, setLaptops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchLaptops = (filters = {}) => {
        setLoading(true);
        setError(null);
        
        const apiFilters = {};
        if (filters.priceFrom) apiFilters.priceFrom = parseInt(filters.priceFrom) * 100;
        if (filters.priceTo) apiFilters.priceTo = parseInt(filters.priceTo) * 100;
        if (filters.ram) apiFilters.ram = parseInt(filters.ram);
        if (filters.brandId) apiFilters.brandId = parseInt(filters.brandId);

        laptopApi.getAllLaptops(apiFilters)
            .then(data => {
                setLaptops(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchLaptops();
    }, []);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleFilter = (filters) => {
        fetchLaptops(filters);
    };

    const filteredLaptops = laptops.filter(laptop => {
        if (!searchTerm) return true;
        const searchLower = searchTerm.toLowerCase();
        return (
            laptop.model.toLowerCase().includes(searchLower) ||
            laptop.brand.name.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className={style.catalogPage}>
            <Header />
            <main className={style.catalog}>
                <h2 className={style.title}>Catalog Page</h2>
                <Search onSearch={handleSearch} />
                <Filter onFilter={handleFilter} />
                {loading ? (
                    <Spinner />
                ) : error ? (
                    <div className={style.error}>Error: {error}</div>
                ) : (
                    <div className={style.itemList}>
                        {filteredLaptops.map((item) => (
                            <Item key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default Catalog;