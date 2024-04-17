



function Update_student(updatedData, endpoint, token) {
    const baseUrl = 'http://localhost:3000/api/';
    const endpointUrl = endpoint;
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
        if (!response.ok) {
            throw new Error('Failed to update company data');
        }
        console.log('Student data updated successfully');  
    })
    .catch(error => {
        console.error('Error updating company data:', error);
    });
}
    export default Update_student