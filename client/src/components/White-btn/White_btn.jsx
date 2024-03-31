import styles from './white_btn.module.css';

function White_btn(props){

    return(
        <button className={`${styles.back_btn} ${styles.btn} ${props.className}`}>
            {props.children}
        </button>
    );
}

export default White_btn