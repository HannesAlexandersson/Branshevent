import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { Date_box } from '../index.js';
import { calendarIcon, user_round, circle_user_round } from '../../assets/Icons/index.js';
import { homeBlack, eventBlack, accountBlack, Yrgo, heart, heartlight } from '../../assets/Icons/dropdownicons/index.js';
import styles from './navbar_landing.module.css';


const LocationContext = React.createContext();
function Navbar_landing(){
    const time = '15:00-17:00';
    const day = '24 APRIL';
    //dropdown logic:
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);    

    

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

   
    const navigate = useNavigate();


    
  const handleHome = () => {
    navigate('/');
  }
  const handleAccount = () => {
    navigate('/account');
  }
  const handleEvent = () => {
    navigate('/event');
  }
  const handleYrgo = () => {
    navigate('https://www.yrgo.se');
  }
  const handleFavo = () => {
    navigate('/favourites');
  }

    

    const formatPathname = (pathname) => {
      return pathname.replace(/^\/+|\/+$/g, '');
  };
    return(
      <>
        <div className={styles.main_nav}>
            <button onClick={toggleDropdown} className={styles.hamburger}>&#9776;</button>
            
            <Date_box className={styles.date_box} >
                <div className={styles.icon_day}>
                    <img src={calendarIcon} alt="Calendar" />
                    <span>{day}</span>
                </div>
                <div className={styles.time}>
                    <span>{time}</span>
                </div>
            </Date_box>


            <img src={circle_user_round} alt="user account icon small" className={styles.user_icon}/>
            {isDropdownOpen && (
        <div className={styles.dropdown_menu}>     
          <ul className={styles.dropDown_list}>
            <li onClick={handleHome}><img src={homeBlack} />Home</li>
            <li onClick={handleEvent}><img src={eventBlack}/>Event info</li>
            <li onClick={handleYrgo}><img src={Yrgo}/>YRGO</li>
            <li onClick={handleFavo}><img src={heartlight} />Favourites</li>
            <li onClick={handleAccount}><img src={accountBlack}/>Account</li>
          </ul>
        </div>
      )}
        </div>
    </>
    );
}



export default Navbar_landing