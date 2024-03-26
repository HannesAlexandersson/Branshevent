import React, { useRef, useEffect, useState } from 'react';
import Dragg from 'react-draggable';

function Draggable(props) {
    const [maxTop, setMaxTop] = useState(0);    
    const draggableRef = useRef(null);
    
    useEffect(() => {
        const calculateMaxTop = () => {
            if (draggableRef.current) {
                const cardRect = draggableRef.current.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                let cardHeight = cardRect.height;
                setMaxTop(viewportHeight - cardHeight);
            }
        };
        calculateMaxTop();
    
        window.addEventListener('resize', calculateMaxTop);
    
        return () => {
            window.removeEventListener('resize', calculateMaxTop);
        };
    }, []);

 

  return (
    <Dragg axis="y" bounds={{ top: -maxTop - 200, bottom:  0}}>
      <div ref={draggableRef} className="dragg-card">
        {props.children}        
      </div>
    </Dragg>
  );
}

export default Draggable;