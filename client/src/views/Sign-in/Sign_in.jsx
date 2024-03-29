import { backArrow } from '../../assets/Icons/index.js';
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
                        <button className={styles.content_btn}>STUDENT</button>
                        <button className={styles.content_btn}>COMPANY</button>
                    </div>
                </div>

                <div className={styles.footer_btn_wrapper}>
                    <button className={styles.back_btn}>
                        <img src={backArrow} />
                        BACK
                    </button>
                </div>

            </div>
        </>
    );
}

export default Sign_in