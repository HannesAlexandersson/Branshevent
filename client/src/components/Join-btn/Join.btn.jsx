import Props from 'prop-types';

function Join_btn({className, ...props}){

    return(
        <button className={className}>
            {props.children}
        </button>
    );
}

Join_btn.propTypes = {
    className: Props.string,
    children: Props.string,
}
export default Join_btn