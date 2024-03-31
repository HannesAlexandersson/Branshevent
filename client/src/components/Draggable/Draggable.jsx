import { useRef, useEffect, useState } from 'react';
import Dragg from 'react-draggable';
import styles from './draggable.module.css';

function Draggable(props) {
  const [maxTop, setMaxTop] = useState(0);    // State variable to store the maximum top position
  const draggableRef = useRef(null);  // Reference to the draggable element ( we need to use reference becouse we cant apply draggable to the actual component)
  console.log(`max: ${maxTop}`);
  useEffect(() => {
    const calculateMaxTop = () => {
      if (draggableRef.current) {
        const cardRect = draggableRef.current.getBoundingClientRect();  //get the position of the card, where it is on the viewport
        const viewportHeight = window.innerHeight;  // Get the height of the viewport  
        const totalCardHeight = cardRect.height; //get total card height     
        const visibleCardHeight = Math.max(0, viewportHeight - cardRect.top); //calculate the diff from the position of the top of the card in relation to the viewport to know huw far we should be able to drag the card       
        const notVisiblePart = totalCardHeight - visibleCardHeight;//get how the height of the not visivle part of the card
        //const finalHeight = visibleCardHeight + (visibleCardHeight / 4); // we need little "extra" space at the bottom, roughly a fourth of the visible card height
       console.log(`view: ${viewportHeight} visible: ${visibleCardHeight} final: ${notVisiblePart}`)
        setMaxTop(-notVisiblePart - (visibleCardHeight / 2));  // Calculate the maximum top position based on viewport and element height
      }
    };
    calculateMaxTop();  // initiate the calculateMaxTop function 
  
    window.addEventListener('resize', calculateMaxTop);  // Add event listener to recalculate the maximum top position on window resize
  

    return () => {
      window.removeEventListener('resize', calculateMaxTop);  // Remove event listener when component unmounts its state
    };
  }, []);  // Empty array to ensure the effect runs only once
  
  //The bounds is where we can restrict how far up and down we are able to drag the card, and the axxis restricts wich axis or wich direction we can drag it
  return (
  <Dragg axis="y" bounds={{ top: maxTop, bottom: 0}}>
    <div ref={draggableRef} className={styles.dragg_card}>
    {props.children}        
    </div>
  </Dragg>
  );
}



export default Draggable;