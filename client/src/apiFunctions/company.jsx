import apiUrl from "./config";
const token = localStorage.getItem("token");


export async function searchCompaniesByNameAndTags(searchString, tags) {
    
    return fetch(apiUrl + 'company/searchByNameAndTags', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
            searchString: searchString,
            tags: (tags.length) ? tags.join(',') : '',
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch data');
        }
    })
    .catch(error => {
        throw error;
    })
};

export async function searchCompaniesByName(searchString) {
    
    return fetch(apiUrl + 'company/searchByName/'+searchString, {
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
            throw new Error('Failed to fetch data');
        }
    })
    .catch(error => {
        throw error;
    })
};

export async function searchCompaniesByTags(tags) {
    
    return fetch(apiUrl + 'company/searchByTags/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify({
            tags: tags.join(','),
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch data');
        }
    })
    .catch(error => {
        throw error;
    })
};


export async function searchCompanies(searchString, tags, workPlace){

    return fetch(apiUrl + 'company/search/', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + token, 
        },
        body: JSON.stringify({
            searchString: searchString,
            tags: (tags.length) ? tags : null,
            workPlace: (workPlace.length) ? workPlace : null
        })       
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


export async function registerCompany(userData) {
   
    fetch(apiUrl + 'company/registration', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (response.ok) {           
                return response.json(); 
            } else {
                throw new Error('Failed to send data'); 
            }
        })
        .then(data => {       
            localStorage.setItem('token', data.token);//store the JTW token
            localStorage.setItem('userType', data.userType);     
            sessionStorage.setItem('userId', userId); //store the user id
            sessionStorage.setItem('loggedIn', 'true');//set logged in to true
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    