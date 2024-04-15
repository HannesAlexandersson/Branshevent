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
      return res.status(200).send({ token: token, userData: result, userType: 'company' })
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
    gdpr } = req.body;

  bcrypt.hash(password, SALT, (err, hashed_password) => {
    if (err) {
      console.error('Error hashing password', err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

  const query = `
  INSERT INTO Company (company_name, first_name, last_name, phone_number, email, password, description, open_for_lia, app_start, app_end, work_place, address, company_website, linkedin, gdpr) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  //1. Create a company
  db.run(query, [company_name, first_name, last_name, phone_number, email, hashed_password, description, open_for_lia, app_start, app_end, work_place, address, company_website, linkedin, gdpr], function(err) {
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
            return res.status(200).send({ token: token, userType: 'company' });
        });
    } else {
      const token = jwt.sign({id: companyId, userType: "company"}, SECRET, {expiresIn: 864000});
      return res.status(200).send({ token: token, userType: 'company'})
    }
  });
});
})



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

router.get('/getFavorites', authMiddleware, (req, res) => {
  const query = 'SELECT * FROM Favorite_student WHERE company_id = ?';

  db.all(query, [req.id], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
});

//add favorite student
router.post('/addToFavorite', authMiddleware, (req, res) => {
  const student_id = req.body.favoriteId;
  const query = 'INSERT INTO Favorite_student (student_id, company_id) VALUES (?, ?)';

  db.get(query, [student_id, req.id], (err, rows) => {
    if(err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).send("Favorite company added successfull");
  });
})


//remove favorite student
router.post('/removeFromFavorite', authMiddleware, (req, res) => {
  
  const student_id = req.body.favoriteId;
  const query = 'DELETE FROM Favorite_student WHERE student_id = ? AND company_id = ?';

  db.get(query, [student_id, req.id], (err, rows) => {
    if(err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).send("Favorite company removed successfull");
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


//Search companies
router.post('/search', (req, res) => {

  const searchString = req.body.searchString;
  const workPlace = req.body.workPlace;
  const tags = req.body.tags;

  let query = 'SELECT Company.* FROM Company, Company_tags';
  let joinWord = 'WHERE';

  if (searchString) {
    query = query + ` ${joinWord} company_name LIKE '%${searchString}%' `;
    joinWord = 'AND';
  }

  if (workPlace) {
    query = query + ` ${joinWord} work_place IN ('${workPlace.join("', '")}')`;
    joinWord = 'AND';
  }

  if (tags) {
    query = query + ` ${joinWord} Company_tags.tag_id IN (${tags}) AND Company.id = Company_tags.company_id`;
  }

  query = query + ' GROUP BY Company.id';


  db.all(query, (err, companies) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(companies);
  })
})


export default router;