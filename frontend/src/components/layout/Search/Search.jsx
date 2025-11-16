import style from "./Search.module.css";

function Search() {
    return (
        <div className={style.search}>
            <input className={style.searchInput} type="text" placeholder="Search..." />
        </div>
    );
}

export default Search;