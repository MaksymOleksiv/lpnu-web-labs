import style from "./Filter.module.css";

function Filter() {
    return (
        <div className={style.filter}>
            <h2 className={style.title}>Filter</h2>
            <div className={style.brand}>
            <label htmlFor="brand" className={style.label}>Brand</label>
            <select name="brand" id="brand" className={style.select}>
                <option value="">Select brand</option>
                <option value="brand1">Brand 1</option>
                <option value="brand2">Brand 2</option>
                <option value="brand3">Brand 3</option>
            </select>
            </div>
            <label htmlFor="price" className={style.label}>Price</label>
            <div className={style.priceRange}>
            <input className={style.inputPrice} type="text" id="price-from" placeholder="Enter price" /> 
            <span> _ </span>
            <input className={style.inputPrice} type="text" id="price-to" placeholder="Enter price" />
            </div>

            <div className={style.ram}>
                <label htmlFor="RAM" className={style.label}>RAM</label>
                <select name="RAM" id="RAM" className={style.select}>
                    <option value="">Select RAM</option>
                    <option value="8GB">8GB</option>
                    <option value="16GB">16GB</option>
                    <option value="32GB">32GB</option>
                </select>
            </div>

            <button className={style.button}>Apply Filters</button>
        </div>
    );
}

export default Filter;