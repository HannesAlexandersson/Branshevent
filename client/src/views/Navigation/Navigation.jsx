import styles from './navigation.module.css';
import Ylogo from '../../assets/Logos/yrgo-logoRed.svg';


function Navigation(){

    return(
        <div className={styles.main_nav}>
            <button className={styles.hamburger}>&#9776;</button>
            <div className={styles.title_container}>
                <p className={styles.nav_title}>SIGN IN</p>
            </div>
            <img src={Ylogo} alt="yrgo logo small" />
        </div>
    );
}

export default Navigation