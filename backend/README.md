# Backend

This implementation is for NodeJS based on [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/) and uses [mongoose](https://mongoosejs.com/) as the ODM.

## Project setup
```
npm install
```

### Before startup 
Setup a .env file with the following variables, e.g.:

```
MONGO_URL = mongodb+srv://admin:N462nw7FBeDBIgGZ@group22.tta06lk.mongodb.net/test
```

### Compiles and hot-reloads for development
```
npm start
```

### Run the code
```
node app.js
```

## Overview
For this class we use MongoDb Atlas, Express and Node.js to work on our Database.
```
The CIS 4339 Project 22 Dataplatform API Documentation collection contains sample requests from our MongoDB Database (http://localhost:3000/).
```

Our Database design is extended to be used by multiple organizations by including an "Organization_id" field into EventData and PrimaryData.

It contains the requests from the two collections named EventData and PrimaryData.

## Code we used to insert data in the collections

### EventData
```
db.eventData.insertOne({
  "organization_ID": "Org_1",
  "eventName": "",
  "services": [],
  "date": {
    "$date": {
      "$numberLong": ""
    }
  },
  "address": {
    "line1": "",
    "line2": "",
    "city": "",
    "county": "",
    "zip": ""
  },
  "description": "",
  "attendees": [],
  "__v": 0
})
```

### PrimaryData
```
db.primaryData.insertOne({
  "_id": "17ac8560-3d25-11ed-b844-2b6f2270000s",
  "organization_ID":"Org_1",
  "firstName": "CHRIS",
  "middleName": "D",
  "lastName": "JOHONSON",
  "email": "WM@yahoo.com",
  "phoneNumbers": [
    {
      "primaryPhone": "8888888888",
      "secondaryPhone": ""
    }
  ],
  "address": {
    "line1": "Cim",
    "line2": "",
    "city": "Houston",
    "county": "United States",
    "zip": "77338"
  },
  "createdAt": {
    "$date": {
      "$numberLong": "1664146503866"
    }
  },
  "updatedAt": {
    "$date": {
      "$numberLong": "1664836727979"
    }
  },
  "__v": 0
})
```

## Using CRUD in Postman
In our documention you will find the **GET, POST, PUT & DELETE** methods being used. They are the CRUD operations and are defined as follows:
```
* GET: This method retrieves the information identified by the requested URI. The method is used for read operations (the R in CRUD).
* POST: This method is used to instruct the server to accept the entity enclosed in the request as a new resource. The method is used for create operations (the C in CRUD).
In MongoDB we have use used insertOne command to create and insert a new data in the EventData and PrimaryData collections.
* PUT: This method requests the server to store the enclosed entity under the requested URI. As per the HTTP specification, the server can create the resource if the entity does not exist. It is up to the web service designer to decide whether this behavior should be implemented or resource creation should only be handled by POST requests. The method is used for update operations (the U in CRUD).
* DELETE: This method is used to delete the information identified by the requested URI. The method is used for Delete operations (the D in CRUD).
```
The Commands listed below are some of the pull requests we made in our collection in Postman.

### POST
```
Create Primary Data
http://localhost:3000/primarydata/
Post and Create command into primaryData collection.
```
Input
```
{
    "_id": "17ac8560-3d25-11ed-b844-2b6f22703bF3",
    "firstName": "Harry",
    "middleName": "Edward",
    "lastName": "Styles",
    "email": "hes@yahoo.com",
    "phoneNumber": "7438467899",
    "address": {
        "line1": "1111",
        "line2": "OuterSpace",
        "city": "Houston",
        "county": "Harris",
        "zip": "77005"
    }
}
```
Output
```
{
    "_id": "17ac8560-3d25-11ed-b844-2b6f22703bF3",
    "firstName": "Harry",
    "middleName": "Edward",
    "lastName": "Styles",
    "email": "hes@yahoo.com",
    "phoneNumbers": [],
    "address": {
        "line1": "1111",
        "line2": "OuterSpace",
        "city": "Houston",
        "county": "Harris",
        "zip": "77005"
    },
    "createdAt": "2022-10-06T18:10:03.082Z",
    "updatedAt": "2022-10-06T18:10:03.082Z",
    "__v": 0
}
```
### GET
```
Search for Client by Name or Number
http://localhost:3000/primarydata/search/?firstName=&lastName=&searchBy=name

Query for search based on name or number associated with attendee.
```
Input
```
Query Params
firstName
lastName
searchBy
name
```
Output
```
[
    {
        "address": {
            "line1": "1111",
            "line2": "OuterSpace",
            "city": "Houston",
            "county": "Harris",
            "zip": "77005"
        },
        "_id": "17ac8560-3d25-11ed-b844-2b6f22703bF3",
        "firstName": "Harry",
        "middleName": "Edward",
        "lastName": "Styles",
        "email": "hes@yahoo.com",
        "phoneNumbers": [],
        "createdAt": "2022-10-06T18:10:03.082Z",
        "updatedAt": "2022-10-06T18:10:03.082Z",
        "__v": 0
    }
]
```

### PUT
```
Update and Add Attendee
http://localhost:3000/eventdata/addAttendee/
Adds an attendee to an already created event.
```
### DEL
```
Delete Client
http://localhost:3000/primaryData/clientdelete/17ac8560-3d25-11ed-b844-2b6f22703bF3
Delete client with the use of _ID
```
Outout
```
{
    "msg": {
        "address": {
            "line1": "1111",
            "line2": "OuterSpace",
            "city": "Houston",
            "county": "Harris",
            "zip": "77005"
        },
        "_id": "17ac8560-3d25-11ed-b844-2b6f22703bF3",
        "firstName": "Harry",
        "middleName": "Edward",
        "lastName": "Styles",
        "email": "hes@yahoo.com",
        "phoneNumbers": [],
        "createdAt": "2022-10-06T18:10:03.082Z",
        "updatedAt": "2022-10-06T18:10:03.082Z",
        "__v": 0
    }
}
```
## Resources
```
* MongoDb Explained
* Aggregation Operations
* Full Stake Vue.Js, Express & MongoDb
* Module 4 from CIS 4339 Course
* 2_MongoDb
* 3_MongoDb_Schema
```