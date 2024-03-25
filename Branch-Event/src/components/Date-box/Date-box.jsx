import Props from 'prop-types';

function Date_box(props){

    return(
        <div className={props.className}>
          {props.children}
        </div>
    );
}
Date_box.propTypes = {
    className: Props.string,
}
export default Date_box