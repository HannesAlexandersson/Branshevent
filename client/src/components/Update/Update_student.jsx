



function Update_student(updatedData, endpoint, token) {
    const baseUrl = 'http://localhost:3000/';
    const endpointUrl =  endpoint;
    const url = baseUrl + endpointUrl;
    fetch(url, { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(updatedData),
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
            console.log(data);
            sessionStorage.setItem('userData', data);
            console.log('data updated');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    export default Update_student