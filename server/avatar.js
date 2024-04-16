import path from 'path';
import express from 'express';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname } from 'path';



const router = express.Router();
const db = new sqlite3.Database('branchEvent.db');
//dynamicly get the path to the folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const directoryPath = __dirname;

const studentAvatarFolderPath = path.join(directoryPath, 'Student_avatars');
const companyAvatarFolderPath = path.join(directoryPath, 'Company_avatars');
//get student avatar
router.get('/studentAvatars/:studentId', (req, res) => {
    console.log('hello');
    //client provide the id of student wich avatar we want to fetch
    const { studentId } = req.params;
    //query to find the student first, and their avatar id.
    const query = `SELECT avatar_id FROM Student WHERE id = ?`;
  console.log(studentId, 'before');
    db.get(query, [studentId], (err, row) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (!row) {
        return res.status(404).json({ error: 'Student not found' });
      }
      console.log(studentId, 'before studid');
      //we have the avatar id
      const { avatar_id } = row;
      console.log(avatar_id, 'avatarid');
      //we query the avatar table
      const avatarQuery = `SELECT name FROM Student_avatar WHERE id = ?`;
  
      db.get(avatarQuery, [avatar_id], (avatarErr, avatarRow) => {
        if (avatarErr) {
          console.error('Error querying database:', avatarErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (!avatarRow) {
          return res.status(404).json({ error: 'Avatar not found' });
        }
        //the name is the same as the filename in the avatarfolder
        const avatarName = avatarRow.name.toString();        
        /* const { filename } = avatarName; */
        const imagePath = path.join(studentAvatarFolderPath, avatarName);
  
        //send the image file to the client
        res.sendFile(imagePath);
        console.log('avatar sent to client')
      });
    });
  });


  //get company avatar
router.get('/companyAvatars/:companyId', (req, res) => {
    console.log('hello');   
    const { companyId } = req.params;
    
    const query = `SELECT avatar_id FROM Company WHERE id = ?`;
  
    db.get(query, [companyId], (err, row) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      if (!row) {
        return res.status(404).json({ error: 'company id not found' });
      }
      //we have the avatar id
      const { avatar_id } = row;
      //we query the avatar table
      const avatarQuery = `SELECT name FROM Company_avatar WHERE id = ?`;
  
      db.get(avatarQuery, [avatar_id], (avatarErr, avatarRow) => {
        if (avatarErr) {
          console.error('Error querying database:', avatarErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (!avatarRow) {
          return res.status(404).json({ error: 'Avatar not found' });
        }
        //the name is the same as the filename in the avatarfolder
        const avatarName = avatarRow.name.toString();        
        /* const { filename } = avatarName; */
        const companyimagePath = path.join(companyAvatarFolderPath, avatarName);
  
        //send the image file to the client
        res.sendFile(companyimagePath);
        console.log('avatar sent to client')
      });
    });
  });


  //get avatar by id from avatar tabel
  router.get('/cavatars/:avatar_id', (req, res) => {
    const { avatar_id } = req.params;
    //we query the avatar table
    const avatarQuery = `SELECT name FROM Company_avatar WHERE id = ?`;

    db.get(avatarQuery, [avatar_id], (avatarErr, avatarRow) => {
      if (avatarErr) {
        console.error('Error querying database:', avatarErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!avatarRow) {
        return res.status(404).json({ error: 'Avatar not found' });
      }
      //the name is the same as the filename in the avatarfolder
      const avatarName = avatarRow.name.toString();        
      /* const { filename } = avatarName; */
      const companyimagePath = path.join(companyAvatarFolderPath, avatarName);

      //send the image file to the client
      res.sendFile(companyimagePath);
      console.log('avatar sent to client')
    })
});
//get students avatar from avatarid
router.get('/savatars/:avatar_id', (req, res) => {
    const { avatar_id } = req.params;
    //we query the avatar table
    const avatarQuery = `SELECT name FROM Student_avatar WHERE id = ?`;

    db.get(avatarQuery, [avatar_id], (avatarErr, avatarRow) => {
      if (avatarErr) {
        console.error('Error querying database:', avatarErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (!avatarRow) {
        return res.status(404).json({ error: 'Avatar not found' });
      }
      //the name is the same as the filename in the avatarfolder
      const avatarName = avatarRow.name.toString();        
     
      const companyimagePath = path.join(studentAvatarFolderPath, avatarName);

      //send the image file to the client
      res.sendFile(companyimagePath);
      console.log('avatar sent to client')
    })
});
  
  
  export default router;