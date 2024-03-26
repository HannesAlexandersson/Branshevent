import Props from 'prop-types';


function Box(props){

    return(
        <div className={props.className}>
           {props.children}
        </div>
    );
}
Box.propTypes = {
    className: Props.string,
}
export default Box