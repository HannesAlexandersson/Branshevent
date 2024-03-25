import Props from 'prop-types';

function Logo(props){

    return(
        <div className={props.className}>
            {props.children}
        </div>

    );
}
Logo.propTypes = {
    className: Props.string,
}
export default Logo