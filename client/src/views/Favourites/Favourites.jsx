import { useState, useEffect } from 'react';
import { Nav } from '../index.js';
import { Mini_card, Spacer_bottom,  } from '../../components/index.js';
import Render_mini from '../../components/Render_mini/Render_mini.jsx';
import { briefcase, locationBlack, search, sliders, userSml } from '../../assets/Icons/index.js';
import get_company_all from '../../components/getcompanyAll/get_company_all.jsx';
import style from './favo.module.css';
import { toggleFavorite, getFavorites } from '../../apiFunctions/favorites.jsx';

function Favourites(){
    const [companies, setCompanies] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [animationReverted, setAnimationReverted] = useState(false);
    const [shouldGetFavorites, setShouldGetFavorites] = useState(false);
    const [favorites, setFavorites] = useState([]);

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
            const companyData = await getFavorites(true);
            setCompanies(companyData);
            } catch (error) {
            console.error("Error fetching company data:", error);
            }
        };
    
        fetchData();
        }, [shouldGetFavorites]);


    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const favoriteData = await getFavorites();
                setFavorites(favoriteData);
            } catch (error) {
                console.error("Error fetching favorite data:", error);
            }
        };
        fetchData();
    }, [shouldGetFavorites]);



    async function handleToggleFavorites(favoriteId, isFavorite) {
        await toggleFavorite(favoriteId, isFavorite);
        setShouldGetFavorites(!shouldGetFavorites);
    }


    

     
 
     
 
 
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

            
                    <p>All Favourites</p>

                    <div className={style.mini_cards_containter}>
                        {/* FOREACH COMPANY in DB-favo table  ADD A MINI CARD */}
                        <div className={style.mini_cards_containter}>
                            <Render_mini companies={companies} onHeartClick={handleToggleFavorites} favorites={favorites} />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Favourites