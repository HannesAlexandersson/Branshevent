import Props from 'prop-types';
import style from './bottom.module.css';
function Bottom(props){

    return(
        <div className={style.bottom}>
            {props.children}
        </div>
    );
}

export default Bottom