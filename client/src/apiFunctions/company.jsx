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
