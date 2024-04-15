import apiUrl from "./config";
import { removeFavoriteCompany } from "./student";
const token = localStorage.getItem("token");
const userRole = sessionStorage.getItem("userRole");


export async function getFavorites() {
    const endpointUrl = (userRole === "student") ? 'student/getFavorites' : 'company/getFavorites';
 
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

    // Construct the endpoint depending on what type of user we are, and if we want to add or remove the favorite
    let endpointUrl;
    if(userRole === "student") {
        endpointUrl = 'student/';  
    } else {
        endpointUrl = 'company/';
    }

    if(isFavorite){
        endpointUrl += 'removeFromFavorite';
    } else {
        endpointUrl += 'addToFavorite';
    }

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
