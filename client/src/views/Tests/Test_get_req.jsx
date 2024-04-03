import React, { useState, useEffect } from 'react';

function Test(){
    const [data, setData] = useState(null);

    useEffect(() => {
      
      const fetchData = async () => {
        try {
          
          const response = await fetch('http://localhost:3000/test');
          
          
          if (response.ok) {
           
            const jsonData = await response.json();
            
            
           
            setData(jsonData);
          } else {
           
            console.error('Failed to fetch data:', response.status);
          }
        } catch (error) {          
          console.error('Error fetching data:', error);
        }
      };
  
      
      fetchData();
  
      
      return () => {
        
      };
    }, []); 
    
 
    return (
        <>
            <div>
            {/* Render the fetched data */}
            {data ? (<pre>{JSON.stringify(data, null, 2)}</pre>) : (<p>Loading...</p>)}        
            </div>
        </>
      );
    
}



export default Test