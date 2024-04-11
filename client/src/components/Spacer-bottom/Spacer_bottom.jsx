import props from 'prop-types';
import style from './spacer_bottom.module.css';

function Spacer_bottom(props){

    return(
        <>
            <div className={style.spacer}>
                {props.children}
            </div>
        </>
    );
}

export default Spacer_bottom