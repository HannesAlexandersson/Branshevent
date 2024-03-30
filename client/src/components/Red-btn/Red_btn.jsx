import styles from './red_btn.module.css';

function Red_btn(props){

    return(
        <button className={`${styles.next_btn} ${styles.btn} ${props.className}`}  onClick={props.onClick}>
            {props.children}
        </button>
    );
}

export default Red_btn