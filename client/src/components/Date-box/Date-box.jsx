import Props from 'prop-types';
import style from './date_box.module.css';

function Date_box(props){

    return(
        <div className={style.date_box}>
          {props.children}
        </div>
    );
}
Date_box.propTypes = {
    className: Props.string,
}
export default Date_box