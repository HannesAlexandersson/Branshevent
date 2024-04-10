import React from "react";
import props from 'prop-types';
import Slider from "react-slick";

function SimpleSlider(props) {
    const [slides, setSlides] = useState([1, 2, 3, 4, 5, 6]);
    const handleClick = () => {
      setSlides(
        slides.length === 6 ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : [1, 2, 3, 4, 5, 6]
      );
    };
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      
    };
    return (
      <div className="slider-container">
        <button className="button" onClick={handleClick}>
          Click to change slide count
        </button>
        <Slider {...settings}>
          {slides.map(slide => {
            return (
              <div key={slide}>
                <h3>{slide}</h3>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  
  }

  export default SimpleSlider;