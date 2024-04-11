import { useState } from 'react';
import { Nav } from '../index.js';
import { Mini_card, Spacer_bottom } from '../../components/index.js';
import { briefcase, locationBlack, search, sliders, userSml } from '../../assets/Icons/index.js';
import style from './favo.module.css';

function Favourites(){
    const [showFilter, setShowFilter] = useState(false);
    const [animationReverted, setAnimationReverted] = useState(false);

    const handleFilter = () => {
        setShowFilter(!showFilter);
        setAnimationReverted(false); // Reset animation reverted state
    }
    
    const handleAnimationEnd = () => {
        setAnimationReverted(true); // Set animation reverted state after animation ends
    }

     /*Dummy data */
     sessionStorage.setItem('userRole', 'company');
     sessionStorage.setItem('companyName', ' Big company');
    
     sessionStorage.setItem('firstname', 'Hannes');
     sessionStorage.setItem('lastName', 'Hansson');
     
 
     const userRole = 'company';
     const compName = sessionStorage.getItem('companyName');
     const firstName = sessionStorage.getItem('firstname');
     const lastName = sessionStorage.getItem('lastName');
 /*Dummy data */
 
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

               

                <div className={style.attending_comps}>
                    <p>All Favourites</p>

                    <div className={style.mini_cards_containter}>
                        {/* FOREACH COMPANY in DB  ADD A MINI CARD */}
                        <Mini_card 
                        companyName={compName} 
                        firstName={firstName}
                        lastName={lastName}
                        />

                        <Mini_card 
                        companyName={compName} 
                        firstName={firstName}
                        lastName={lastName}
                        />

                        <Mini_card 
                        companyName={compName} 
                        firstName={firstName}
                        lastName={lastName}
                        />

                        <Mini_card 
                        companyName={compName} 
                        firstName={firstName}
                        lastName={lastName}
                        />
                    </div>
                </div>

            </div>
        </>
    );
}

export default Favourites