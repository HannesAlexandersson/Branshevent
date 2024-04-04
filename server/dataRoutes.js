import express from 'express';
import cors from 'cors';
import { db } from './db.js';
import { getAllTags } from './tagFunctions.js';

const dataRouter = express.Router();


//special CORS settings for dataroutes
/* export const dataCorsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
  };
 */


//the tags from db
let tagRows;

//extract the tag id 
getAllTags((err, tags) => {
    if (err) {
        console.error('Error retrieving tags:', err);
        return;
    }
    tagRows = tags;
    console.log('Rows received...');//debuggin, if the callback works
});

//apply the cors options to the datarouter
/* dataRouter.use(cors(dataCorsOptions)); */
//test endpoint for post request from client
dataRouter.post('/data', (req, res) => {
    const userData = req.body;    
    console.log('server is recieving...', userData);    
    let query;
    const userRole = userData.userRole;
    //check what kind of user we ae dealing with to know what table we inserting data into (OBS remember to add password to the query when we finsihed implementing that)
    if (userRole === 'student') {     
       // Extract the tags array from userData
      const selectedTagsArray = userData.studentTagsData.tags;
      console.log(`selectedtags: ${selectedTagsArray}`);
      // Initialize an empty object to store tag IDs
      const tagIds = {};
      // Iterate over the selected tags array
      selectedTagsArray.forEach(selectedTag => {
          // Find the matching tag in the rows retrieved from the database
          const matchingTag = tagRows.find(row => row.name === selectedTag);
          if (matchingTag) {            
              // If a match is found, store the tag ID
              tagIds[selectedTag] = matchingTag.id;
          }
      });
      //now we have the id's if all the selected tags so that we can save that into the db     
      //deconstruct the formdata for processing to db
      const studentFormData = userData.studentFormData; 
      //prepare the db query  
      query = `INSERT INTO Student (firstName, lastName, email, phone, role, password, startdate, enddate, description, prefered_location ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      //execute the query
      db.run(query, [studentFormData.firstName, studentFormData.lastName, studentFormData.email, studentFormData.phoneNumber, userData.studentOccupation, '123456', userData.studentStartDate, userData.studentEndDate, userData.studentDescription, userData.studentWorkLocation], function(error) {
        //some lightweight error handling
        if (error) {
            console.error('Error inserting data:', error);
            res.status(500).send('Error inserting data');
            return;
        }
        //sucess
        console.log('Data inserted successfully');
        
        //when we have inserted all other data we can retrieve the ID of the newly inserted user to be able to insert the tagsdata associated with that user
        const userId = this.lastID;
        // Convert the values of tagIds object to an array
        const tagIdsArray = Object.values(tagIds);
        // Associate tags with the user      
        tagIdsArray.forEach(tagId => {
          const query = 'INSERT INTO StudentTag (student_id, tag_id) VALUES (?, ?)';
          db.run(query, [userId, tagId], function(error) {
              if (error) {
                  console.error('Error inserting UserTag:', error);
                  return;
              }
              console.log('Tag inserted successfully');
          });
        });
      //let the client know we did it!
      res.status(200).send('Data received and inserted successfully');
    });
    
    
   
    } else if (userRole === 'company') { 
      // Extract the tags array from userData
      const selectedTagsArray = userData.companyTagsData.tags;
      // Initialize an empty object to store tag IDs
      const tagIds = {};
      // Iterate over the selected tags array
      selectedTagsArray.forEach(selectedTag => {
          // Find the matching tag in the rows retrieved from the database
          const matchingTag = tagRows.find(row => row.name === selectedTag);
          if (matchingTag) {
              // If a match is found, store the tag ID
              tagIds[selectedTag] = matchingTag.id;
          }
      });
      //now we have the id's if all the selected tags so that we can save that into the db      
      //deconstruct the formdata for processing to db
      const companyFormData = userData.companyFormData; 
      //prepare the db query  
      query = `INSERT INTO Company (company_name, password, firstname, lastname, email, phone, company_description, accept_interns, lia_period_start, lia_period_end, preferd_location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      //execute the query (OBS REMEMBER TO ADD LOGIC FOR PASSWORD WHEN WE ARE DONE WITH IMPLEMENTING THAT ON SITE)
      db.run(query, [companyFormData.companyName, '123456', companyFormData.firstName, companyFormData.lastName, companyFormData.email, companyFormData.phoneNumber, userData.companyStartDate, userData.companyEndDate, userData.companyDescription, userData.companyWorkLocation], function(error) {
      //some lightweight error handling
      if (error) {
          console.error('Error inserting data:', error);
          res.status(500).send('Error inserting data');
          return;
      }
      //when we have inserted all other data we can retrieve the ID of the newly inserted user to be able to insert the tagsdata associated with that user
    const userId = this.lastID;
     // Convert the values of tagIds object to an array
     const tagIdsArray = Object.values(tagIds);
    // Associate tags with the user      
    tagIdsArray.forEach(tagId => {
      const query = 'INSERT INTO CompanyTag (company_id, tag_id) VALUES (?, ?)';
      db.run(query, [userId, tagId], function(error) {
          if (error) {
              console.error('Error inserting UserTag:', error);                
              return;
          }
          console.log('Tag inserted successfully');
        });
    });
      //sucess
      console.log('Data inserted successfully');
      //let the client know we did it!
      res.status(200).send('Data received and inserted successfully');
    });    
    
    
    } else {
        // if it for some weird reason the userRole doesnt compute we have to deal with it somehow. but how? for now:
        console.error('Invalid user role:', userRole);
        res.status(400).send('Invalid user role');
        return;
    }    
});

export default dataRouter 