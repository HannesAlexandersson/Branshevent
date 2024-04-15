# BranchEvent API

The API is a node.js app using express for routing and storing the database in an SQLITE database.

The API uses JWT tokens to authenticate.

# Installation

Requirements: 
- Node 21.6.2 or compatible.

1. Clone the repository from github. 
2. Navigate into the /server folder
3. Run: "npm install" in the terminal
4. Start the server with: "node server.js" from within the server folder.

This will start the express api on the local server, listening on port 3000 by default. (This can be changed in the config.js file)

# Configuration

The PORT and SECRET can be set in the /server/config.js file.

No other configuration should be required.

# Usage

To start the server:

from /server run "node server.js" to start the server.

All endpoints are placed under /api/, and with the exception for the registration and login endpoints, they all require the request to contain an Authorization header with a bearer token.

In order to get this token, first perform a successful login request towards /api/student/login or /api/company/login - this request will return a JWT token. 

Place this token in you localstorage or similar and add it to the header of all subsequent request using this pattern:

```javascript
header: {'Content-Type': 'application/json', authorization: 'bearer '+TOKEN }
```

Where TOKEN is the jwt token recieved from the login request.

Example request:

```javascript
 fetch('/api/student/getById/2',{
    method: 'GET', 
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
})
```

## API Reference

#### Student - Login

```javascript
  POST /api/student/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| email | string | *Required*. The student's email |
| password | string | *Required*. The student's password |

Returns a TOKEN for future authentization

#### Student - Register

```javascript
  POST /api/student/registration
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| first_name | string | *Required*. The student's first name |
| last_name | string | *Required*. The student's last name |
| email | string | *Required*. The student's email |
| password | string | *Required*. The student's password |
| phone_number | string | *Required*. The student's phone number |
| description| string | *Required*. The student's description|
| work_place| string | *Required*. The student's work place |
| tags | string | a comma separated string with tag ids, for example (1, 2, 3)|

Returns a TOKEN for future authentization

#### Student - Get all students

```javascript
  GET /api/student/all
```

#### Student - Update
 
```javascript
  POST /api/student/update
```

| Parameter | Type     | 
| :-------- | :------- | 
| first_name | string | 
| last_name | string | 
| email | string | 
| password | string | 
| phone_number | string |  
| description| string | 
| work_place| string | 


#### Student - Get by ID
 
```javascript
  GET /api/student/:studentId
```

#### Student - Get favorite companies
 
```javascript
  GET /api/student/getFavorites
```

#### Student - Add favorite company
 
```javascript
  POST /api/student/addToFavorite
```

#### Student - Remove favorite company
 
```javascript
  POST /api/student/removeFromFavorite
```

#### Student - Get by name
 
```javascript
  GET /api/student/getByName/:studentName
```

#### Student - Get by tags
 
```javascript
  GET /api/student/getByTags/:tags
```

#### Student - Search by name
 
```javascript
  GET /api/student/searchByName/:studentName
```

#### Student - Get student's tags
 
```javascript
  GET /api/student/:studentId/tags
```

#### Student - Search by tag and ID
 
```javascript
  POST /api/student/searchByNameAndTags
```

#### Student - Search students
 
```javascript
  POST /api/student/search
```


---


#### Company - Login

```javascript
  POST /api/company/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| email | string | *Required*. The company's email |
| password | string | *Required*. The companys's password |

Returns a TOKEN for future authentization


#### Company - Register

```javascript
  POST /api/company/registration
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| company_name | string | *Required*. The company's first name |
| first_name | string | *Required*. The company's contact person first name |
| last_name | string | *Required*. The company's contact person last name |
| email | string | *Required*. The company's email |
| password | string | *Required*. The companys's password |
| phone_number | string | *Required*. The company's phone number |
| description| string | *Required*. The company's description|
| tags | string | a comma separated string with tag ids, for example (1, 2, 3)|

Returns a TOKEN for future authentization

#### Company - Get all companies

```javascript
  GET /api/company/all
```

#### Company - Update
 
```javascript
  POST /api/company/update
```

| Parameter | Type     | 
| :-------- | :------- | 
| first_name | string | 
| last_name | string | 
| email | string | 
| password | string | 
| phone_number | string |  
| description| string | 


#### Company - Get by ID
 
```javascript
  GET /api/company/:companyId
```

#### Company - Add favorite student
 
```javascript
  POST /api/company/addToFavorite
```

#### Company - Remove favorite student
 
```javascript
  POST /api/company/removeFromFavorite
```

#### Company - Get by name
 
```javascript
  GET /api/company/getByName/:companyName
```

#### Company - Get by tags
 
```javascript
  GET /api/company/getByTags/:tags
```

#### Company - Search by name
 
```javascript
  GET /api/company/searchByName/:companyName
```

#### Company - Search by name and tags
 
```javascript
  POST /api/company/searchByNameAndTags
```

#### Company - Search by tag and ID
 
```javascript
  POST /api/company/searchByTags
```

#### Company - Get tags by ID
 
```javascript
  GET /api/company/:companyId/tags
```
#### Company - Search companies
 
```javascript
  POST /api/company/search
```
