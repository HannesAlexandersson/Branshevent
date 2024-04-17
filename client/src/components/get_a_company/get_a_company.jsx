

function get_a_company(token, id){
    const companyId = id;
    const baseUrl = 'http://localhost:3000/api/';
    const url = baseUrl + companyId;

    return fetch(url, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token, 
        },       
    })
    .then(response => {
        if (response.ok) {
            console.log('Data received successfully');            
            return response.json(); 
        } else {
            console.error('Failed to fetch data');
            throw new Error('Failed to fetch data'); 
        }
    })    
    .catch(error => {
        console.error('Error:', error);
        throw error; // Rethrow the error to be caught in the calling function
    });

    
}

export default get_a_company