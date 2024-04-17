//http://localhost:3000/

//https://liameetup.vercel.app/
function SendDataToServer(userData, endpoint) {
const baseUrl = ' https://brancheventapi.azurewebsites.net/';
const endpointUrl =  endpoint;
const url = baseUrl + endpointUrl;
fetch(url, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (response.ok) {
            console.log('Data sent successfully');            
            return response.json(); 
        } else {
            console.error('Failed to send data');
            throw new Error('Failed to send data'); 
        }
    })
    .then(data => {       
        console.log('Token:', data.token);
        localStorage.setItem('token', data.token);//store the JTW token
        const userId = data.id; //extract the user id from the respone
        console.log('User ID:', userId);      
        sessionStorage.setItem('userId', userId); //store the user id
        sessionStorage.setItem('loggedIn', 'true');//set logged in to true
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


//test get request
/* fetch('http://localhost:3000/api/test')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data.message); // This should log "This is a test endpoint"
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
} */
export default SendDataToServer;



