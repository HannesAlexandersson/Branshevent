import Props from 'prop-types';
import style from './gradient.module.css';

function Gradient(props){

    return(
        <div className={style.gradient}></div>
    );
}

Gradient.propTypes = {
    className: Props.string,
}

export default Gradient