//http://localhost:3000/api/
//https://liameetup.vercel.app/api/
function get_a_student(token, id){
    const companyId = id;
    const baseUrl = ' https://brancheventapi.azurewebsites.net/api/student/';
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

export default get_a_student