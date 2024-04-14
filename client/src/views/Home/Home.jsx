import { useState, useEffect } from 'react';
import { Nav } from '../index.js';
import get_company_all from "../../components/getcompanyAll/get_company_all.jsx";
import { briefcase, locationBlack, search, sliders, userSml } from '../../assets/Icons/index.js';
import style from './home.module.css';
import { heartlight } from '../../assets/Icons/dropdownicons/index.js';
import { Mini_card, Quiz_wrapper, Spacer_bottom, Simple_slider } from '../../components/index.js';
import Render_mini from '../../components/Render_mini/Render_mini.jsx';
import Multiselect from 'multiselect-react-dropdown';
//import { getAllUsedTags, searchCompaniesByName, searchCompaniesByNameAndTags, searchCompaniesByTags } from '../../apiFunctions/company.jsx';

function Home(){
    const [showFilter, setShowFilter] = useState(false);
    const [animationReverted, setAnimationReverted] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState('');
    const [searchString, setSearchString] = useState('');

    const userRole = sessionStorage.getItem('userType');
    const token = localStorage.getItem('token');
    
    // get inital companies/student
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const companyData = await get_company_all(token);
                setCompanies(companyData);
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };
        fetchData();
    }, []);
    
    // get all tags
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tagsData = await getAllUsedTags();
                setTags(tagsData);
            } catch (error) {
                console.error("Error fetching company data:", error);
            }
        };
    
        fetchData();
    }, []);
    
    // do search
    useEffect(() => {
            const fetchData = async () => {
                try {
                    let companyData;
                    if(!searchString.length && !selectedTags || !selectedTags.length) {
                        const token = localStorage.getItem('token');
                        companyData = await get_company_all(token);
                    }
                    else if (searchString.length && selectedTags && selectedTags.length){
                        companyData = await searchCompaniesByNameAndTags(searchString, selectedTags);
                    } else if (!selectedTags || !selectedTags.length && searchString) {
                        companyData = await searchCompaniesByName(searchString);
                    } else if (!searchString && selectedTags && selectedTags.length) {
                        companyData = await searchCompaniesByTags(selectedTags);
                    }
                    setCompanies(companyData);
                } catch (error) {
                    console.error("Error fetching company data:", error);
                }
            };
            fetchData();
    }, [userRole, selectedTags.length, searchString]);
    
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
                        onChange={(event) => setSearchString(event.target.value)}

                        className={style.searchbar_input} 
                        type="text" 
                        id="search-input" 
                        placeholder={`Search ${(sessionStorage.getItem('userRole') == 'student' ? 'Companies' : 'Students')}`} />
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
                            { tags &&
                                <Multiselect options={tags} displayValue='name' groupBy='category_name' 
                                    onSelect={(selectedList) => {setSelectedTags(selectedList.map(tag => tag.id))}} onRemove={(selectedList) => setSelectedTags(selectedList.map(tag => tag.id))} />
                            }
                            {/* Dropdown for workplace */}
                            <select className={style.dropdown} defaultValue={""}>
                                <option value="" disabled hidden>Workplace</option>
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