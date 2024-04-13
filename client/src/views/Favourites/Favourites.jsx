import { useState, useEffect } from 'react';
import { Nav } from '../index.js';
import { Mini_card, Spacer_bottom,  } from '../../components/index.js';
import Render_mini from '../../components/Render_mini/Render_mini.jsx';
import { briefcase, locationBlack, search, sliders, userSml } from '../../assets/Icons/index.js';
import get_company_all from '../../components/getcompanyAll/get_company_all.jsx';
import style from './favo.module.css';

function Favourites(){
    const [companies, setCompanies] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [animationReverted, setAnimationReverted] = useState(false);

    const handleFilter = () => {
        setShowFilter(!showFilter);
        setAnimationReverted(false); // Reset animation reverted state
    }
    
    const handleAnimationEnd = () => {
        setAnimationReverted(true); // Set animation reverted state after animation ends
    }

    
    //get all companies the user have liked, for now render all companies in db
    useEffect(() => {
        const fetchData = async () => {
            try {
            const token = localStorage.getItem("token");
            const companyData = await get_company_all(token);
            setCompanies(companyData);
            } catch (error) {
            console.error("Error fetching company data:", error);
            }
        };
    
        fetchData();
        }, []);
    
     
 
     
 
 
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
                

                

               

                <div className={style.attending_comps}>

                <div className={style.search_wrapper_large}>
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
                    <div className={`${style.filter_btn} ${showFilter ? style.active : ''}`}>
                        <div className={style.filter_btn_content}>
                            <p className={style.filt}>FILTER</p>
                            <button onClick={handleFilter} className={style.filter_btn_btn}>
                                <img src={sliders} alt="sliders" />
                            </button>
                        </div>
                        {showFilter && (
                        <div className={style.dropdowns_wrapper}>
                            {/* Dropdown for tags */}
                            <select className={style.dropdown}>
                            <option value="" disabled selected hidden>Tags</option>
                            </select>
                            {/* Dropdown for workplace */}
                            <select className={style.dropdown}>
                                <option value="" disabled selected hidden>Workplace</option>
                                <option value="office">Office</option>
                                <option value="remote">Remote</option>
                                <option value="both">Both</option>
                            </select>
                        </div>
                        )}
                    </div>
                </div>


                    <p>All Favourites</p>

                    <div className={style.mini_cards_containter}>
                        {/* FOREACH COMPANY in DB-favo table  ADD A MINI CARD */}
                        <div className={style.mini_cards_containter}>
                            <Render_mini companies={companies} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Favourites