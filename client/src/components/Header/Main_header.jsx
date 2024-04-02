import Props from 'prop-types';
import style from './main_header.module.css';

function Main_header(props){

    return(

        <div className={style.main_header}>
            {props.children}
        </div>
    );
}

Main_header.propTypes = {
    className: Props.string,
}
export default Main_header