import express from 'express';
import sqlite3 from 'sqlite3';
import jwt from 'jsonwebtoken';
import { SECRET, SALT } from './config.js';
import { authMiddleware } from './authMiddleware.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const db = new sqlite3.Database('branchEvent.db');



//get all students
router.get('/all', (req, res) => {
    const query = 'SELECT * FROM Student';
  
    db.all(query, [], (err, rows) => {
      if(err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json(rows);
    });
  });



//login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM Student WHERE email = ?';

  db.get(query, [email], (err, result) => {
    if(err){
      console.log(err.message);
      return res.status(500).json({ error : 'Internal Server Error' });
    }

    if(!result) {
      console.log('Login fail : No student found');
      return res.status(403).json({ error: 'Email or password incorrect' });
    }

    bcrypt.compare(password, result.password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    if (result) {
        //passwords match - user authenticated
        console.log('Student authenticated successfully');
        //creating a token to encrypt data and send back to the client for future authentication
        const token = jwt.sign({id: result.id, userType: "student"}, SECRET, {expiresIn: 864000});
        return res.status(200).send({ token: token })
    } else {
        // Passwords do not match
        console.log('Incorrect password');
        return res.status(401).json({ error: 'Incorrect password' });
    }
    });
  });
});


//test token route
router.get('/testToken', authMiddleware, (req, res) => {
    return res.status(200).send({ userType : req.userType });
})



//get student by ID
router.get('/:studentId', authMiddleware, (req, res) => {
  const studentId = req.params.studentId;
  const query = 'SELECT * FROM Student WHERE id = ?';

  db.get(query, [studentId], (err, rows) => {
    if(err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
});



//registration
router.post('/registration', (req, res) => {
    const { first_name, last_name, email, password, phone_number, tags, description, work_place } = req.body;
    
    bcrypt.hash(password, SALT, (err, hashed_password) => {
      if (err) {
        console.error('Error hashing password', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    const query = `
    INSERT INTO Student (first_name, last_name, email, password, phone_number, description, work_place) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`; 

    
    //1. create the student; enter the hashed password into the db
    db.run(query, [first_name, last_name, email, hashed_password, phone_number, description, work_place], function(err) {
        if(err){
            console.error('Error inserting student', err.message);
            return res.status(500).json({ error : 'Internal Server Error' });
        }
        
        console.log('Student created successfully');
        const studentId = this.lastID;

        
        //2. get the student_id and add the tags to the db
        if(tags.length > 0) {
            const tagString = tags.map(tag_id => `(${tag_id}, ${studentId})`).join(`,`);  // 19 => (19, 2)
            const tagQuery = `INSERT INTO Student_tags (tag_id, student_id) VALUES ${tagString}`;

            db.run(tagQuery, function(err) {
                if(err){
                    console.log(err.message);
                    return res.status(500).json({ error : 'Internal Server Error' });
                }
                console.log('Tags added successfully');
    
                const token = jwt.sign({id: studentId, userType: "student"}, SECRET, {expiresIn: 864000});
                return res.status(200).send({ token: token })
            });
        } else {
          const token = jwt.sign({id: studentId, userType: "student"}, SECRET, {expiresIn: 864000});
          return res.status(200).send({ token: token })

        }
    });
  });
});


//update a student
router.post('/update', authMiddleware, (req, res) => {
  const { first_name, last_name, email, password, phone_number, description, work_place, studentId } = req.body;
  const updateQuery = `
  UPDATE Student 
  SET first_name = ?, last_name = ?, email = ?, password = ?, phone_number = ?, description = ?, work_place = ? 
  WHERE id = ?`;

  db.run(updateQuery, [first_name, last_name, email, password, phone_number, description, work_place, studentId], function(err) {
    if(err){
        console.log(err.message);
        return res.status(500).json({ error : 'Internal Server Error' });
    }
    console.log('Student updated successfully');
    return res.status(200).send("Update successfull");
  });
})



//add favorite companies
router.get('/addToFavorite/:studentId/:companyId', authMiddleware, (req, res) => {
  const studentId = req.params.studentId;
  const companyId = req.params.companyId;

  const query = 'INSERT INTO Favorite_company (student_id, company_id) VALUES (?, ?)';

  db.get(query, [studentId, companyId], (err, rows) => {
    if(err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).send("Favorite company added successfull");
  });
})



//get student by name
router.get('/getByName/:studentName', authMiddleware, (req, res) => {
  const studentName = req.params.studentName;
  const query = 'SELECT * FROM Student WHERE name = ?';

  db.get(query, [studentName], (err, student) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(student);
  });
});



//get student by tags
router.get('/getByTags/:tags', authMiddleware, (req, res) => {
  const tags = req.params.tags.split(',');
  const query = `
  SELECT Student_tags.*, Student.name
  FROM Student_tags
  LEFT JOIN Student ON Student_tags.student_id = Student.id
  WHERE Student_tags.tag_id IN (?)`;
  
  db.all(query, tags, (err, students) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    console.log(students);
    res.json(students);
  });
});



//search by name
router.get('/searchByName/:studentName', authMiddleware, (req, res) => {
  const studentName = req.params.studentName;
  const query = `
  SELECT * FROM Student 
  WHERE first_name LIKE ? OR last_name LIKE ?`;
  const searchName = '%' + studentName + '%';

  db.all(query, [searchName], (err, students) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(students);
  });
});


export default router;