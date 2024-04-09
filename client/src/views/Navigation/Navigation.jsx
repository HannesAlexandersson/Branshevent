import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link, } from 'react-router-dom';
import { home, event, account, yrgo, heart, heartlight } from '../../assets/Icons/dropdownicons/index.js';
import styles from './navigation.module.css';
import Ylogo from '../../assets/Logos/yrgo-logoRed.svg';

const LocationContext = React.createContext();
function Navigation(){
  //dropdown logic:
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);    

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

  //page title logic:
    const [pathname, setPathname] = useState('');
    const [pageTitle, setPageTitle] = useState('');
    const navigate = useNavigate();


    // array of all our route paths converted to page titles
    const titleMap = {
      '/': 'Home',
      '/sign-in': 'SIGN IN',
      '/company-signup': 'COMPANY SIGN-UP',
      '/company-account': 'COMPANY SIGN-UP',
      '/company-description': 'COMPANY SIGN-UP',
      '/company-work': 'COMPANY SIGN-UP',
      '/company-summary': 'COMPANY SUMMARY',
      '/company-finish': 'COMPANY FINISH',
      '/student-signup': 'STUDENT SIGN-UP',
      '/student-account': 'STUDENT SIGN-UP',
      '/student-description': 'STUDENT SIGN-UP',
      '/student-work': 'STUDENT SIGN-UP',
      '/student-summary': 'STUDENT SUMMARY',
      '/student-finish': 'STUDENT FINISH',
      '/account': 'USER PROFILE',
      '/test-to-DB': 'Test to database',
    }    

    useEffect(() => {
      setPathname(window.location.pathname);
      setPageTitle(titleMap[window.location.pathname] || 'Default Title');
  }, []);

    const formatPathname = (pathname) => {
      return pathname.replace(/^\/+|\/+$/g, '');
  };
    return(
      <LocationContext.Provider value={{ pathname: formatPathname(pathname), pageTitle }}>
        <div className={styles.main_nav}>
            <button onClick={toggleDropdown} className={styles.hamburger}>&#9776;</button>
            <div className={styles.title_container}>
                <p className={styles.nav_title}>{pageTitle}</p>
            </div>
            <img src={Ylogo} alt="yrgo logo small" className={styles.nav_logo}/>
            {isDropdownOpen && (
        <div className={styles.dropdown_menu}>     
          <ul className={styles.dropDown_list}>
            <li><Link to="/"><img src={home}/>Home</Link></li>
            <li><img src={event}/>Event info</li>
            <li><img src={yrgo}/>YRGO</li>
            <li><img src={heart}/>Favourites</li>
            <li><Link to="/account"><img src={account}/>Account</Link></li>
          </ul>
        </div>
      )}
        </div>
        <Outlet />
    </LocationContext.Provider>
    );
}

function useLocationInfo() {
  return React.useContext(LocationContext);
}

export default Navigation