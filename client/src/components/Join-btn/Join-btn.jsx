import Props from 'prop-types';
import { Link } from 'react-router-dom';
import style from './join_btn.module.css';


function Join_btn({ ...props }){

    return(
        <Link to="/sign-in">
            <button className={style.btn}>
                {props.children}
            </button>
        </Link>
    );
}

Join_btn.propTypes = {
    className: Props.string,
    children: Props.string,
}
export default Join_btn