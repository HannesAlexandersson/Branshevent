import Props from 'prop-types';
import style from './dragg_header.module.css';

function Dragg_header(props){

    return(
        <div className={style.dragg_header}>
           <h2>{props.children}</h2>
        </div>

    );
}

Dragg_header.propTypes = {
    children: Props.string,
}
export default Dragg_header