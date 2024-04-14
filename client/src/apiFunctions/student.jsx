import apiUrl from "./config";
const token = localStorage.getItem("token");


export async function searchStudentByNameAndTags(searchString, tags) {
    
    return fetch(apiUrl + 'student/searchByNameAndTags', {
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

export async function searchStudentByName(searchString) {
    
    return fetch(apiUrl + 'student/searchByName/' + searchString, {
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

export async function searchStudentByTags(tags) {
    
    return fetch(apiUrl + 'student/getByTags/' + tags, {
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


export async function getAllStudents(token) {


    return fetch(apiUrl + 'student/all/', { 
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
  
export async function searchStudents(searchString, tags, workPlace){

    console.log(searchString, tags, workPlace);
    return fetch(apiUrl + 'student/search/', { 
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
