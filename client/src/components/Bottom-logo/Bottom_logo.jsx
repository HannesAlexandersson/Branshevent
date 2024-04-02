import Props from 'prop-types';
import style from './bottom_logo.module.css';


function Bottom_logo(props){

    return (
        
        <img className={style.bottom_logo} src={props.src} alt={props.alt} />
        
    );
}



export default Bottom_logo