import { backArrow } from '../../assets/Icons/index.js';
import { Link } from 'react-router-dom';
import Nav from '../../views/Navigation/Navigation.jsx';
import styles from './sign_in.module.css';



function Sign_in(){

    return(
        <>
            <Nav/>
            <div className={styles.main}>
                <div className={styles.progress_bar}>PROGRESSBAR HERE</div>

                <div className={styles.content_wrapper}>
                    <div className={styles.content_text}>
                        <h1>Who are you?</h1>
                        <p>I am a…</p>
                    </div>
                    <div className={styles.content_btn_wrapper}>
                        <Link className={styles.content_btn} to="#">STUDENT</Link>
                        <Link className={styles.content_btn} to="/company-signup">COMPANY</Link>
                    </div>
                </div>

                <div className={styles.footer_btn_wrapper}>
                    <Link to="/">
                        <button className={styles.back_btn}>
                            <img src={backArrow} />
                            <p>BACK</p>
                        </button>
                    </Link>
                </div>

            </div>
        </>
    );
}

export default Sign_in