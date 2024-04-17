// https://liameetup.vercel.app/api/
//http://localhost:3000/api/avatars/
function Get_avatars( id, token, endpoint){    
    const baseUrl = 'https://liameetup.vercel.app/api/avatars/';
    const providedEndpoint = endpoint;
    const userId = id;
    const url = baseUrl + providedEndpoint + userId;
   
    return fetch(url, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',     
            'Authorization': 'Bearer ' + token
        },       
    })
    .then(response => {
        if (response.ok) {
            console.log('Data received successfully');            
            return response.blob(); 
        } else {
            console.error('Failed to fetch data');
            throw new Error('Failed to fetch data'); 
        }
    })    
    .catch(error => {
        console.error('Error:', error);
        throw error; 
    });
}


export default Get_avatars