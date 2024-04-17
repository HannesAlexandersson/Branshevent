
//http://localhost:3000/api/
//https://liameetup.vercel.app/api/
function get_company_tags( id, token){
    const companyId = id;
    const baseUrl = 'https://liameetup.vercel.app/api/company/';
    const end = '/tags';
    const url = baseUrl + companyId + end;
   
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
export default get_company_tags