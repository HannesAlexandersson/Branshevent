


function SendDataToServer(userData, endpoint) {
const baseUrl = 'http://localhost:3000/';
const endpointUrl =  endpoint;
const url = baseUrl + endpointUrl;
fetch(url, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (response.ok) {
            console.log('Data sent successfully');            
            return response.json(); 
        } else {
            console.error('Failed to send data');
            throw new Error('Failed to send data'); 
        }
    })
    .then(data => {      
      const userId = data.id; 
      console.log('User ID:', userId);
  
      
      sessionStorage.setItem('userId', userId);
  })
    .catch(error => {
        console.error('Error:', error);
    });
}


//test get request
/* fetch('http://localhost:3000/api/test')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data.message); // This should log "This is a test endpoint"
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
} */
export default SendDataToServer;



