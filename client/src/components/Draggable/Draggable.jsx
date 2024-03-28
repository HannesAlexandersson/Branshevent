import React, { useRef, useEffect, useState } from 'react';
import Dragg from 'react-draggable';
import styles from './draggable.module.css';

function Draggable(props) {
  const [maxTop, setMaxTop] = useState(0);    // State variable to store the maximum top position
  const draggableRef = useRef(null);  // Reference to the draggable element ( we need to use reference becouse we cant apply draggable to the actual component)
  
  useEffect(() => {
    const calculateMaxTop = () => {
      if (draggableRef.current) {
        const cardRect = draggableRef.current.getBoundingClientRect();  // Get the dimensions of the draggable element
        const viewportHeight = window.innerHeight;  // Get the height of the viewport
        let cardHeight = cardRect.height;  // Get the height of the draggable element
        setMaxTop(viewportHeight - cardHeight);  // Calculate the maximum top position based on viewport and element height
      }
    };
    calculateMaxTop();  // initiate the calculateMaxTop function 
  
    window.addEventListener('resize', calculateMaxTop);  // Add event listener to recalculate the maximum top position on window resize
  
    return () => {
      window.removeEventListener('resize', calculateMaxTop);  // Remove event listener when component unmounts its state
    };
  }, []);  // Empty array to ensure the effect runs only once

  return (
  <Dragg axis="y" bounds={{ top: -maxTop - 200, bottom:  0}}>
    <div ref={draggableRef} className={styles.dragg_card}>
    {props.children}        
    </div>
  </Dragg>
  );
}

export default Draggable;