import { Nav } from '../index.js';
import { search, sliders } from '../../assets/Icons/index.js';
import style from './home.module.css';

function Home(){

    return(
        <>
            <div className={style.main}>
                <Nav />

                <div className={style.search_wrapper}>
                    <div className={style.searchbar}>
                        <input 
                        className={style.searchbar_input} 
                        type="text" 
                        id="search-input" 
                        placeholder="Search companies" />
                        <img src={search} />
                    </div>
                </div>

                <div className={style.filter_wrapper}>
                    <div className={style.filter_btn}>
                        <p className={style.filt}>FILTER</p>
                        <img src={sliders} />
                    </div>
                </div>

                <div className={style.quiz_wrapper}>
                    <button className={style.quizbtn}>
                        <p className={style.quiz_head}>What company suits you the best?</p>
                        <p className={style.quiz_sub}>Increase your chances of connecting by taking this quiz</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Home