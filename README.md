<<<<<<< HEAD
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

header: {'Content-Type': 'application/json', authorization: 'bearer '+TOKEN }

Where TOKEN is the jwt token recieved from the login request.

Example request:

 fetch('/api/student/getById/2',{
    method: 'GET', 
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
})
=======
BranchEvent API
The API is a node.js app using express for routing and storing the database in an SQLITE database.
>>>>>>> dev

The API uses JWT tokens to authenticate.

<<<<<<< HEAD
## API Reference

#### Student - Login

  POST /api/student/login

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| email | string | *Required*. The student's email |
| password | string | *Required*. The student's password |

Returns a TOKEN for future authentization

#### Student - Register

  POST /api/student/registration

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

#### Student - Get all student

  GET /api/student/all

#### Student - Update
 
  POST /api/student/update

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
 
  GET /api/student/:studentId

#### Student - Add favorite companies
 
  GET /api/student/addToFavorite/:studentId/:companyId'

#### Student - Get by name
 
  GET /api/student/getByName/:studentName'

#### Student - Get by tag
 
  GET /api/student/getByTags/:tags'

#### Student - Search by name
 
  GET /api/student/searchByName/:studentName'

---

#### Company - Login

  POST /api/company/login

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| email | string | *Required*. The company's email |
| password | string | *Required*. The companys's password |

Returns a TOKEN for future authentization

#### Company - Register

  POST /api/company/registration

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

  GET /api/company/all

#### Company - Update
 
  POST /api/company/update

| Parameter | Type     | 
| :-------- | :------- | 
| first_name | string | 
| last_name | string | 
| email | string | 
| password | string | 
| phone_number | string |  
| description| string | 


#### Company - Get by ID
 
  GET /api/company/:companyId

#### Company - Add favorite student
 
  GET /api/company/addToFavorite/:companyId/:studentId'

#### Company - Get by name
 
  GET /api/company/getByName/:companyName'

#### Company - Get by tag
 
  GET /api/company/getByTags/:tags'

#### Company - Search by name
 
  GET /api/company/searchByName/:companyName'
=======
Installation
Requirements:

Node 21.6.2 or compatible.
Clone the repository from github.
Navigate into the /server folder
Run: "npm install" in the terminal
Start the server with: "node server.js" from within the server folder.
This will start the express api on the local server, listening on port 3000 by default. (This can be changed in the config.js file)

Configuration
The PORT and SECRET can be set in the /server/config.js file.

No other configuration should be required.

Usage
To start the server:

from /server run "node server.js" to start the server.

All endpoints are placed under /api/, and with the exception for the registration and login endpoints, they all require the request to contain an Authorization header with a bearer token.

In order to get this token, first perform a successful login request towards /api/student/login or /api/company/login - this request will return a JWT token.

Place this token in you localstorage or similar and add it to the header of all subsequent request using this pattern:

header: {'Content-Type': 'application/json', authorization: 'bearer '+TOKEN }

Where TOKEN is the jwt token recieved from the login request.

Example request:

fetch('/api/student/getById/2',{ method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, })

API Reference
Student - Login
POST /api/student/login

Parameter	Type	Description
email	string	Required. The student's email
password	string	Required. The student's password
Returns a TOKEN for future authentization

Student - Register
POST /api/student/register

Parameter	Type	Description
first_name	string	Required. The student's first name
last_name	string	Required. The student's last name
email	string	Required. The student's email
password	string	Required. The student's password
phone_number	string	Required. The student's phone number
description	string	Required. The student's description
work_place	string	Required. The student's work place
tags	string	a comma separated string with tag ids, for example (1, 2, 3)
Returns a TOKEN for future authentization

Student - Get all student
GET /api/student/all

Student - Update
POST /api/student/update

Parameter	Type
first_name	string
last_name	string
email	string
password	string
phone_number	string
description	string
work_place	string
Student - Get by ID
GET /api/student/:studentId

Student - Add favorite companies
GET /api/student/addToFavorite/:studentId/:companyId'

Student - Get by name
GET /api/student/getByName/:studentName'

Student - Get by tag
GET /api/student/getByTags/:tags'

Student - Search by name
GET /api/student/searchByName/:studentName'

Company - Login
POST /api/company/login

Parameter	Type	Description
email	string	Required. The company's email
password	string	Required. The companys's password
Returns a TOKEN for future authentization

Company - Register
POST /api/company/register

Parameter	Type	Description
company_name	string	Required. The company's first name
first_name	string	Required. The company's contact person first name
last_name	string	Required. The company's contact person last name
email	string	Required. The company's email
password	string	Required. The companys's password
phone_number	string	Required. The company's phone number
description	string	Required. The company's description
tags	string	a comma separated string with tag ids, for example (1, 2, 3)
Returns a TOKEN for future authentization

Company - Get all companies
GET /api/company/all

Company - Update
POST /api/company/update

Parameter	Type
first_name	string
last_name	string
email	string
password	string
phone_number	string
description	string
Company - Get by ID
GET /api/company/:companyId

Company - Add favorite student
GET /api/company/addToFavorite/:companyId/:studentId'

Company - Get by name
GET /api/company/getByName/:companyName'

Company - Get by tag
GET /api/company/getByTags/:tags'

Company - Search by name
GET /api/company/searchByName/:companyName'
>>>>>>> dev
