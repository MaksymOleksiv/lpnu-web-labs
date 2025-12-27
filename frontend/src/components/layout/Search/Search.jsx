import { useState } from "react";
import style from "./Search.module.css";

function Search({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value);
    };

    return (
        <div className={style.search}>
            <input 
                className={style.searchInput} 
                type="text" 
                placeholder="Search by brand or model..." 
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    );
}

export default Search;