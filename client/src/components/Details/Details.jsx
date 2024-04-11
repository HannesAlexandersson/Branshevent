import Props from 'prop-types';
import style from './details.module.css';

function Details(props){

    return(
        <div className={style.detail}>
            {props.children}
        </div>
    );
}

export default Details