import { useState, useEffect } from 'react';
import { Nav } from '../index.js';
import get_company_all from "../../components/getcompanyAll/get_company_all.jsx";
import { briefcase, locationBlack, search, sliders, userSml } from '../../assets/Icons/index.js';
import style from './home.module.css';
import { heartlight } from '../../assets/Icons/dropdownicons/index.js';
import { Mini_card, Quiz_wrapper, Spacer_bottom, Simple_slider } from '../../components/index.js';
import Render_mini from '../../components/Render_mini/Render_mini.jsx';

function Home(){
    const [showFilter, setShowFilter] = useState(false);
    const [animationReverted, setAnimationReverted] = useState(false);
    const [companies, setCompanies] = useState([]);

    const userRole = sessionStorage.getItem('userType');
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    
    const compName = userData.company_name;
    const firstName = userData.first_name;
    const lastName = userData.last_name;

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
                            <Simple_slider 
                                companies={companies}
                            />                                    
                                
                        </div>
                    </div>

                </div>

                <div className={style.attending_comps}>
                    <p>All companies attending</p>

                    <div className={style.mini_cards_containter}>
                        <Render_mini companies={companies} />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Home