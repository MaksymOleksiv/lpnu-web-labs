import style from './Spinner.module.css';

const Spinner = () => {
    return (
        <div className={style.spinnerContainer}>
            <div className={style.spinner}></div>
        </div>
    );
};

export default Spinner;
