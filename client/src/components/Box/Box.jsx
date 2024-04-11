import Props from 'prop-types';
import style from './box.module.css';

function Box(props){

    return(
        <div className={style.box}>
           {props.children}
        </div>
    );
}
Box.propTypes = {
    className: Props.string,
}
export default Box