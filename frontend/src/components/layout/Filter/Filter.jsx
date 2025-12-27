import { useState, useEffect } from "react";
import style from "./Filter.module.css";
import { brandApi } from "../../../api/laptopApi";

function Filter({ onFilter }) {
    const [brands, setBrands] = useState([]);
    const [filters, setFilters] = useState({
        brandId: '',
        priceFrom: '',
        priceTo: '',
        ram: ''
    });

    useEffect(() => {
        brandApi.getAllBrands()
            .then(data => setBrands(data))
            .catch(err => console.error('Failed to fetch brands:', err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleApply = () => {
        onFilter(filters);
    };

    const handleReset = () => {
        const emptyFilters = {
            brandId: '',
            priceFrom: '',
            priceTo: '',
            ram: ''
        };
        setFilters(emptyFilters);
        onFilter(emptyFilters);
    };

    return (
        <div className={style.filter}>
            <h2 className={style.title}>Filter</h2>
            <div className={style.brand}>
                <label htmlFor="brand" className={style.label}>Brand</label>
                <select 
                    name="brandId" 
                    id="brand" 
                    className={style.select}
                    value={filters.brandId}
                    onChange={handleChange}
                >
                    <option value="">Select brand</option>
                    {brands.map(brand => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
            </div>
            <label htmlFor="price" className={style.label}>Price</label>
            <div className={style.priceRange}>
                <input 
                    className={style.inputPrice} 
                    type="number" 
                    id="price-from" 
                    name="priceFrom"
                    placeholder="From ($)" 
                    value={filters.priceFrom}
                    onChange={handleChange}
                    min="0"
                /> 
                <span> _ </span>
                <input 
                    className={style.inputPrice} 
                    type="number" 
                    id="price-to" 
                    name="priceTo"
                    placeholder="To ($)" 
                    value={filters.priceTo}
                    onChange={handleChange}
                    min="0"
                />
            </div>

            <div className={style.ram}>
                <label htmlFor="RAM" className={style.label}>RAM</label>
                <select 
                    name="ram" 
                    id="RAM" 
                    className={style.select}
                    value={filters.ram}
                    onChange={handleChange}
                >
                    <option value="">Select RAM</option>
                    <option value="8">8GB</option>
                    <option value="16">16GB</option>
                    <option value="32">32GB</option>
                    <option value="64">64GB</option>
                </select>
            </div>

            <button className={style.button} onClick={handleApply}>Apply Filters</button>
            <button className={style.button} onClick={handleReset}>Reset Filters</button>
        </div>
    );
}

export default Filter;