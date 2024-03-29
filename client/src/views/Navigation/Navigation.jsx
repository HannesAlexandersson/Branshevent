import React, { useState } from 'react';
import { home, event, account, yrgo } from '../../assets/Icons/dropdownicons/index.js';
import styles from './navigation.module.css';
import Ylogo from '../../assets/Logos/yrgo-logoRed.svg';


function Navigation(){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

    return(
        <div className={styles.main_nav}>
            <button onClick={toggleDropdown} className={styles.hamburger}>&#9776;</button>
            <div className={styles.title_container}>
                <p className={styles.nav_title}>SIGN IN</p>
            </div>
            <img src={Ylogo} alt="yrgo logo small" />
            {isDropdownOpen && (
        <div className={styles.dropdown_menu}>     
          <ul className={styles.dropDown_list}>
            <li><img src={home}/>Home</li>
            <li><img src={event}/>Event info</li>
            <li><img src={yrgo}/>YRGO</li>
            <li><img src={account}/>Account</li>
          </ul>
        </div>
      )}
        </div>
    );
}

export default Navigation