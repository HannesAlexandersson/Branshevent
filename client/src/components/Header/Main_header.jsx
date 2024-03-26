import Props from 'prop-types';

function Main_header(props){

    return(

        <div className={props.className}>
            {props.children}
        </div>
    );
}

Main_header.propTypes = {
    className: Props.string,
}
export default Main_header