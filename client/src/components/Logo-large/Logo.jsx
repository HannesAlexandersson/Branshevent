import Props from 'prop-types';
import style from './logo.module.css';

function Logo(props){

    return(
        <div className={style.logo_large}>
            {props.children}
        </div>

    );
}
Logo.propTypes = {
    className: Props.string,
}
export default Logo