import apiUrl from "./config";

export async function register(userData, userType) {
    fetch(apiUrl + userType + '/registration', { 
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
            sessionStorage.setItem('userId', data.id); //store the user id
            sessionStorage.setItem('loggedIn', 'true');//set logged in to true
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export async function login(email, password, userType) {

    try {
        const login = await fetch(apiUrl + userType +'/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',        
            },
            body: JSON.stringify({ email, password }),
        });
        
        if (!login.ok) {         
            throw new Error('Failed to fetch data');
        }

        const data = await login.json(); 
        localStorage.setItem('token', data.token); // Store the JWT token
        localStorage.setItem('userType', data.userType); // Store the JWT token

        sessionStorage.setItem('userData', JSON.stringify(data.userData)); // Store user data in sessionStorage        
        sessionStorage.setItem('userType', data.userType);
        sessionStorage.setItem('id', data.userData.id);
        sessionStorage.setItem('loggedIn', 'true'); //set logged in to true
        return data;
    } catch(error) {
        throw error; // Rethrow the error to be caught in the calling function
    }
}