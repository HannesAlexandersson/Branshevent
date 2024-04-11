import express from 'express';
import sqlite3 from 'sqlite3';
import jwt from 'jsonwebtoken';
import { SECRET, SALT } from './config.js';
import { authMiddleware } from './authMiddleware.js';
import bcrypt from 'bcrypt';


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
  const query = 'SELECT * FROM Company WHERE email = ? AND password = ?';

  console.log(email, password);
  db.get(query, [email, password], (err, result) => {
    if(err){
      console.log(err.message);
      return res.status(500).json({error : 'internal server error'});
    }
    if (!result) {
      console.log('Login fail : No company found');
      return res.status(403).json({ error: 'Email or password incorrect' });
    } 
     //creating a token to encrypt data and send back to the client for future authentication
    const token = jwt.sign({id: result.id, userType: "company"}, SECRET, {expiresIn: 864000});
    return res.status(200).send({ token: token })
  });
})



//test token route
router.get('/testToken', authMiddleware, (req, res) => {
  return res.status(200).send({ userType : req.userType });
})


//get company by ID
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
  const { company_name, first_name, last_name, phone_number, email, password, tags, description } = req.body;
  const query = `
  INSERT INTO Company (company_name, first_name, last_name, phone_number, email, password, description) 
  VALUES (?, ?, ?, ?, ?, ?)`;

  //1. Create a company
  db.run(query, [company_name, first_name, last_name, phone_number, email, password, description], function(err) {
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
        
            return res.status(200).json({ id: companyId });
        });
    } else {
        return res.status(200).json({ id: companyId });
    }
  });
})



//update a company
router.post('/update', authMiddleware, (req, res) => {
  const { company_name, first_name, last_name, phone_number, email, password, description, companyId } = req.body;
  const updateQuery = `
  UPDATE Company 
  SET company_name = ?, first_name = ?, last_name = ?, phone_number = ?, email = ?, password = ?, description = ? 
  WHERE id = ?`;

  db.run(updateQuery, [company_name, first_name, last_name, phone_number, email, password, description, companyId], function(err) {
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



export default router;