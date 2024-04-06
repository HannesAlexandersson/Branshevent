

function SendDataToServer(userData) {
    fetch('http://localhost:3000/data', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) 
    })
    .then(response => {
        if (response.ok) {
            console.log('Data sent successfully');            
        } else {
            console.error('Failed to send data');            
        }
    })
    .catch(error => {
        console.error('Error:', error);        
    });
}

export default SendDataToServer