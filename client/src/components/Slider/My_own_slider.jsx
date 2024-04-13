import React, { useState } from 'react';
import props from 'prop-types';
import style from './slider.module.css'; // Make sure to import your CSS file

function MyOwnSlider({ companies, children }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNextSlide = () => {
    const nextIndex = currentIndex === companies.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const goToPrevSlide = () => {
    const prevIndex = currentIndex === 0 ? companies.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  return (
    <div className={style.slider_container_child}>
      {children[currentIndex]}
      <div className={style.prev_nxt_cont}>
        <button className={style.nxt_prev} onClick={goToPrevSlide}>&lt;-</button>
        <button className={style.nxt_prev} onClick={goToNextSlide}>-&gt;</button>
      </div>
    </div>
  );
}

export default MyOwnSlider;