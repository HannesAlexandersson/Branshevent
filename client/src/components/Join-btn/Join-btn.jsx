import Props from 'prop-types';
import style from './join_btn.module.css';


function Join_btn({ ...props }){

    return(
        <button className={style.btn}>
            {props.children}
        </button>
    );
}

Join_btn.propTypes = {
    className: Props.string,
    children: Props.string,
}
export default Join_btn