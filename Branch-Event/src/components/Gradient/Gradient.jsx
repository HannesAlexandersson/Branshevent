import Props from 'prop-types';

function Gradient(props){

    return(
        <div className={props.className}></div>
    );
}

Gradient.propTypes = {
    className: Props.string,
}

export default Gradient