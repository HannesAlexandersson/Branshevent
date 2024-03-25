import React, { useRef, useEffect, useState } from 'react';
import Dragg from 'react-draggable';

function Draggable(props) {
    const [maxTop, setMaxTop] = useState(0);
    const draggableRef = useRef(null);

    useEffect(() => {
        const calculateMaxTop = () => {
            if (draggableRef.current) {
                const cardHeight = draggableRef.current.offsetHeight;
                const viewportHeight = window.innerHeight;
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
    <Dragg axis="y" bounds={{ top: 0, bottom: maxTop }}>
      <div ref={draggableRef} className="dragg-card">
        {props.children}
        <button className='btn-white default-font'>
            Join the Event
        </button>
      </div>
    </Dragg>
  );
}

export default Draggable;