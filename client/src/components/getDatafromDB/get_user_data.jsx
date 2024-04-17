import { jwtDecode } from "jwt-decode";

function get_user_data(endpoint, email, password, token) {
    const baseUrl = 'https://liameetup.vercel.app/';
    const endpointUrl = endpoint;
    const url = baseUrl + endpointUrl;

    return fetch(url, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',     
            'Authorization': 'Bearer ' + token,        
        },
        body: JSON.stringify({ email, password }),
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
    .then(data => {      
        console.log('Token:', data.token);
        localStorage.setItem('token', data.token); // Store the JWT token
        sessionStorage.setItem('userData', JSON.stringify(data.userData)); // Store user data in sessionStorage        
        console.log('Successfully retrieved user data');
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        sessionStorage.setItem('userType', decoded.userType);
        sessionStorage.setItem('id', decoded.id);
        console.log(decoded);
        return data; // Return the user data for further processing if needed
    })
    .catch(error => {
        console.error('Error:', error);
        throw error; // Rethrow the error to be caught in the calling function
    });
}

export default get_user_data;