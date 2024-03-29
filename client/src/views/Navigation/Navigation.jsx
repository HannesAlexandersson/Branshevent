import React, { useState } from 'react';
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
            <li>links here 1</li>
            <li>links here 2</li>
            <li>links here 3</li>
          </ul>
        </div>
      )}
        </div>
    );
}

export default Navigation