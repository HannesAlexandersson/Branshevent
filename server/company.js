import express from 'express';
import sqlite3 from 'sqlite3';
import jwt from 'jsonwebtoken';
import { SECRET, SALT } from './config.js';
import { authMiddleware } from './authMiddleware.js';
import bcrypt from 'bcrypt';
import  {saveCompanyImageToFilesystem, generateRandomCompFilename} from './saveCompanyAvatar.js';



const router = express.Router();
const db = new sqlite3.Database('branchEvent.db');



//get all companies
router.get('/all', (req, res) => {
    const query = 'SELECT * FROM Company';
  
    db.all(query, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(rows);
    });
  });



//login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM Company WHERE email = ?';

  
  db.get(query, [email], (err, result) => {
    if(err){
      console.log(err.message);
      return res.status(500).json({error : 'internal server error'});
    }
    if (!result) {
      console.log('Login fail : No company found');
      return res.status(403).json({ error: 'Email or password incorrect' });
    }

    if (result) {
    bcrypt.compare(password, result.password, (bcryptErr, bcryptResult) => { //you where using result here, that reset result to the result of the encryption witch was true or false only
      if (bcryptErr) {
        console.error('Error comparing passwords:', bcryptErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    if (bcryptResult) {
      console.log('User ID:', result.id);
      //passwords match - user authenticated
        console.log('Company authenticated successfully');
      //creating a token to encrypt data and send back to the client for future authentication
      const token = jwt.sign({id: result.id, userType: "company"}, SECRET, {expiresIn: 864000});
      return res.status(200).send({ token, userData: result })
    } else {
      console.log('Incorrect password');
      return res.status(401).json({ error: 'Incorrect password' });
    }
    });
  }
  });
})



// //test token route
// router.get('/testToken', authMiddleware, (req, res) => {
//   return res.status(200).send({ userType : req.userType });
// })


//get by ID
router.get('/:companyId', authMiddleware, (req, res) => {
  const companyId = req.params.companyId;
  const query = 'SELECT * FROM Company WHERE id = ?';

  db.get(query, [companyId], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
});



//registration
router.post('/registration', (req, res) => {
  const { 
    company_name, 
    first_name, 
    last_name, 
    phone_number, 
    email, 
    password, 
    tags, 
    open_for_lia, 
    app_start, 
    app_end, 
    work_place, 
    address, 
    description, 
    company_website, 
    linkedin, 
    gdpr,
    avatar } = req.body;

    // Handle saving image in the background so it doesnt disturb the rest  of the reg process even if there is a problem with saving the image
    let filename = '';
    let avatar_id;
    if (avatar) {
      const imageData = avatar;
      filename = generateRandomCompFilename();     
      
      try {          
          saveCompanyImageToFilesystem(imageData, filename, (err, imagePath) => {
              if (err) {
                  console.error('Error saving image:', err);
                  console.log('The image may not have been saved properly.');
              } else {
                  console.log('Image saved successfully:', imagePath);
              }
              });
          } catch (e) {
              console.error('Error saving image:', e);
              console.log('The image may not have been saved properly.');
          }
        }


  bcrypt.hash(password, SALT, (err, hashed_password) => {
    if (err) {
      console.error('Error hashing password', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (filename) {
      //insert the avatar to the avatar table
      db.run('INSERT INTO Company_avatar (name) VALUES (?)', [filename], function(insertErr) {
        if (insertErr) {
            console.error('Error inserting filename into database:', insertErr);
        } 
        console.log('Filename inserted into database successfully');          
        // Retrieve the generated avatar ID
        avatar_id = this.lastID;
        console.log(avatar_id);



  const query = `
  INSERT INTO Company (company_name, first_name, last_name, phone_number, email, password, description, open_for_lia, app_start, app_end, work_place, address, company_website, linkedin, gdpr, avatar_id) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  //1. Create a company
  db.run(query, [company_name, first_name, last_name, phone_number, email, hashed_password, description, open_for_lia, app_start, app_end, work_place, address, company_website, linkedin, gdpr, avatar_id], function(err) {
      if(err){
          console.log(err.message);
          return res.status(500).json({ error : 'Internal Server Error' });
      }
      console.log('Registration successfull')
      
      const companyId = this.lastID;

       //2. get the company_id and add the tags to the db
       if(tags.length > 0) {
        const tagString = tags.map(tag_id => `(${tag_id}, ${companyId})`).join(`,`);  // 19 => (19, 2)
        const tagQuery = `INSERT INTO Company_tags (tag_id, company_id) VALUES ${tagString}`;

        db.run(tagQuery, function(err) {
            if(err){
                console.log(err.message);
                return res.status(500).json({ error : 'Internal Server Error' });
            }
            console.log('Tags added successfully');
        
            const token = jwt.sign({id: companyId, userType: "company"}, SECRET, {expiresIn: 864000});
            return res.status(200).send({ token: token })
              });
          } else {
            const token = jwt.sign({id: companyId, userType: "company"}, SECRET, {expiresIn: 864000});
            return res.status(200).send({ token: token })
          }

          //3.insert the student id to the avatar table 
          if (companyId && avatar_id) {
            db.run('UPDATE Company_avatar SET company_id = ? WHERE id = ?', [companyId, avatar_id], (updateErr) => {
                if (updateErr) {
                    console.error('Error updating avatar table:', updateErr);
                } else {
                    console.log('User ID inserted into avatar table successfully');
                }
              });
          }


        });
    }); //
  }//
});

});



//update a company
router.post('/update', authMiddleware, (req, res) => {
  const { 
    company_name, 
    first_name, 
    last_name, 
    phone_number, 
    email, 
    password, 
    description, 
    open_for_lia, 
    app_start, 
    app_end, 
    work_place, 
    address, 
    company_website, 
    linkedin } = req.body;

  const updateQuery = `
  UPDATE Company 
  SET company_name = ?, first_name = ?, last_name = ?, phone_number = ?, email = ?, password = ?, description = ?, open_for_lia = ?, app_start = ?, app_end = ?, work_place = ?, address = ?, company_website = ?, linkedin  = ? 
  WHERE id = ?`;

  db.run(updateQuery, [company_name, first_name, last_name, phone_number, email, password, description, open_for_lia, app_start, app_end, work_place, address, company_website, linkedin, req.id], function(err) {
    if(err){
        console.log(err.message);
        return res.status(500).json({ error : 'Internal Server Error' });
    }

    console.log('Company updated successfully');
    return res.status(200).send("Update successfull");
  });
})



//add favorite student
router.get('/addToFavorite/:companyId/:studentId', authMiddleware, (req, res) => {
  const studentId = req.params.studentId;
  const companyId = req.params.companyId;
  const query = 'INSERT INTO Favorite_student (company_id, student_id) VALUES (?, ?)';

  db.get(query, [companyId, studentId], (err, rows) => {
    if(err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).send("Favorite student added successfull");
  });
})



//get by name
router.get('/getByName/:companyName', authMiddleware, (req, res) => {
  const companyName = req.params.companyName;
  const query = 'SELECT * FROM Company WHERE company_name = ?';

  db.get(query, [companyName], (err, company) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(company);
  });
});



//get by tags
router.get('/getByTags/:tags', authMiddleware, (req, res) => {
  const tags = req.params.tags.split(',');
  const query = `
  SELECT Company_tags.*, Company.company_name
  FROM Company_tags
  LEFT JOIN Company ON Company_tags.company_id = Company.id
  WHERE Company_tags.tag_id IN (?)`;
  
  db.all(query, tags, (err, companies) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log(companies);
    res.json(companies);
  });
});



//search by name
router.get('/searchByName/:companyName', authMiddleware, (req, res) => {
  const companyName = req.params.companyName;
  const query = `
  SELECT * FROM Company 
  WHERE company_name LIKE ?`;
  const searchName = '%' + companyName + '%';

  db.all(query, [searchName], (err, companies) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(companies);
  });
});


//search by tag & id
router.post('/searchByNameAndTags', authMiddleware, (req, res) => {

  const tags = req.body.tags;
  const companyName = req.body.searchString;
  const query = `
  SELECT Company.*, Company_tags.tag_id
  FROM Company
  JOIN Company_tags ON Company.id = Company_tags.company_id
  WHERE Company_tags.tag_id IN (${tags})
  AND Company.company_name LIKE (?)
  GROUP BY Company.id`;
  const searchName = '%' + companyName + '%';

  db.all(query, [searchName], (err, companies) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(companies);
  });
});

//search by tag & id
router.post('/searchByTags', authMiddleware, (req, res) => {

  const tags = req.body.tags;
  const companyName = req.body.searchString;
  const query = `
  SELECT Company.*, Company_tags.*
  FROM Company
  JOIN Company_tags ON Company.id = Company_tags.company_id
  WHERE Company_tags.tag_id IN (${tags})`;

  db.all(query, [], (err, companies) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(companies);
  });
});



//get tags by id
router.get('/:companyId/tags', (req, res) => {
  const companyId = req.params.companyId;
const query = `
  SELECT tag_id 
  FROM Company_tags 
  WHERE company_id = ?;
`;

db.all(query, [companyId], (err, rows) => {
  if (err) {
    console.error('Error retrieving tags:', err);
    res.status(500).json({ error: 'Internal server error' });
  } else {
    // extract tag IDs from the query result
    const tagIds = rows.map(row => row.tag_id);
    res.json(tagIds);
    console.log('tags succesfully sent to client');
  }
});
});


export default router;