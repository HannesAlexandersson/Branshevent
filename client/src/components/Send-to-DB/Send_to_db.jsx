

function SendDataToServer(userData) {
    fetch('/test', { // Change this to the correct endpoint path
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData) // Ensure userData is JSON-stringified
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