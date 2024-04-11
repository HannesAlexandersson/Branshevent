import { useState } from 'react';
import { Nav } from '../index.js';
import { briefcase, locationBlack, search, sliders, userSml } from '../../assets/Icons/index.js';
import style from './home.module.css';
import { heartlight } from '../../assets/Icons/dropdownicons/index.js';
import { Mini_card, Quiz_wrapper, Spacer_bottom } from '../../components/index.js';

function Home(){
    const [showFilter, setShowFilter] = useState(false);
    const [animationReverted, setAnimationReverted] = useState(false);

    /*Dummy data */
    sessionStorage.setItem('userRole', 'student');
    sessionStorage.setItem('companyName', ' Big company');
   
    sessionStorage.setItem('firstname', 'Hannes');
    sessionStorage.setItem('lastName', 'Hansson');
    

    const userRole = sessionStorage.getItem('userRole');
    const compName = sessionStorage.getItem('companyName');
    const firstName = sessionStorage.getItem('firstname');
    const lastName = sessionStorage.getItem('lastName');
/*Dummy data */

const handleFilter = () => {
    setShowFilter(!showFilter);
    setAnimationReverted(false); // Reset animation reverted state
}

const handleAnimationEnd = () => {
    setAnimationReverted(true); // Set animation reverted state after animation ends
}
    return(
        <>
            <div className={style.main}>
                <Nav />
<div className={style.page_wrapper}>
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

                <Spacer_bottom />

                {userRole === 'student' && (
                    <Quiz_wrapper />
                )}               
                

                <div className={style.new_companies_slider}>

                    <div className={style.new_companies_slide_card}>
                        <div className={style.new_cmp_head}>
                            <p>New companies</p>
                        </div>
        <div className={style.slide_container}>
                {/*SLIDER GOES HERE */}
                
                        <div className={style.redBox}>
                            <div className={style.img_wrapper}>
                                <div className={style.img_display_area}>
                                    <div className={style.icon_container}>
                                        <img src={heartlight} />
                                    </div>
                                </div>
                            </div>
        
                            <div className={style.name_box}>
                                <img src={briefcase} />
                                <p>{compName}</p>
                            </div>
                            <div className={style.name_box}>
                                <div className={style.name_loc_wrapper}>
                                    <img src={userSml} />
                                    <p>{firstName} {lastName}</p>
                                </div>
                                <div className={style.name_loc_wrapper}>                                
                                    <img src={locationBlack} />
                                    <p>Company City</p>
                                </div>
                            </div>
                        </div>
                {/*END SLIDER */}
                
        </div>
                    </div>

                </div>

                <div className={style.attending_comps}>
                    <p>All companies attending</p>

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
        </div>
        </>
    );
}

export default Home