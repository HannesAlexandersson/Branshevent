import apiUrl from "./config";

export async function getFavorites() {
    const userType = localStorage.getItem("userType");
    const token = localStorage.getItem("token");
    const endpointUrl = (userType === "student") ? 'student/getFavorites' : 'company/getFavorites';
    return fetch(apiUrl + endpointUrl, { 
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

export async function toggleFavorite(favoriteId, isFavorite) {
    const userType = localStorage.getItem("userType");
    const token = localStorage.getItem("token");
    // Construct the endpoint depending on what type of user we are, and if we want to add or remove the favorite
    let endpointUrl;
    if(userType === "student") {
        endpointUrl = 'student/';  
    } else {
        endpointUrl = 'company/';
    }

    if(isFavorite){
        endpointUrl += 'removeFromFavorite';
    } else {
        endpointUrl += 'addToFavorite';
    }

    console.log(endpointUrl);

    return fetch(apiUrl + endpointUrl, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token, 
        },   
        body: JSON.stringify({ favoriteId: favoriteId })    
    })
    .then(response => {
        if (!response.ok) { 
            throw new Error('Failed to fetch data'); 
        } else {
            return true;
        }
    })    
    .catch(error => {
        console.error('Error:', error);
        throw error; // Rethrow the error to be caught in the calling function
    });
}

export default getFavorites;

