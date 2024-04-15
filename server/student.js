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

    if (result) {
    bcrypt.compare(password, result.password, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        console.error('Error comparing passwords:', bcryptErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

    if (bcryptResult) {
        //passwords match - user authenticated
        console.log('Student authenticated successfully');
        //creating a token to encrypt data and send back to the client for future authentication
        const token = jwt.sign({id: result.id, userType: "student"}, SECRET, {expiresIn: 864000});
        return res.status(200).send({ token: token, userData: result })
    } else {
        // Passwords do not match
        console.log('Incorrect password');
        return res.status(401).json({ error: 'Incorrect password' });
    }
    });
  }
  });
});


// //test token route
// router.get('/testToken', authMiddleware, (req, res) => {
//     return res.status(200).send({ userType : req.userType });
// })





//registration
router.post('/registration', (req, res) => {
    const { 
      first_name, 
      last_name, 
      email, 
      password, 
      phone_number, 
      gdpr, 
      tags, 
      description, 
      github, 
      portfolio, 
      linkedin, 
      occupation,
      behance, 
      work_place, 
      app_start, 
      app_end } = req.body;
    
    bcrypt.hash(password, SALT, (err, hashed_password) => {
      if (err) {
        console.error('Error hashing password', err.message);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      console.log(work_place);
 
    const query = `
    INSERT INTO Student (first_name, last_name, email, password, occupation, phone_number, gdpr, description, github, portfolio, linkedin, behance, work_place, app_start, app_end) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; 

    
    //1. create the student
    db.run(query, [first_name, last_name, email, hashed_password, occupation, phone_number, gdpr,description, github, portfolio, linkedin, behance, work_place, app_start, app_end], function(err) {
      console.log(work_place);
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
  const { 
    first_name, 
    last_name, 
    email, 
    password, 
    phone_number, 
    description, 
    github, 
    portfolio, 
    linkedin, 
    occupation,
    behance, 
    work_place, 
    app_start, 
    app_end } = req.body;

  const updateQuery = `
  UPDATE Student 
  SET first_name = ?, last_name = ?, email = ?, password = ?, phone_number = ?, description = ?, github = ?, portfolio = ?, linkedin = ?, occupation = ?, behance = ?, work_place = ?, app_start = ?, app_end = ? 
  WHERE id = ?`;

  db.run(updateQuery, [first_name, last_name, email, password, phone_number, description, github, portfolio, linkedin, occupation, behance, work_place, app_start, app_end, req.id], function(err) {
    if(err){
      console.log(req.id);
        console.log(err.message);
        return res.status(500).json({ error : 'Internal Server Error' });
    }
    console.log('Student updated successfully');
    return res.status(200).send("Update successfull");
  });
})


router.get('/getFavorites', authMiddleware, (req, res) => {
  const query = 'SELECT * FROM Favorite_company WHERE student_id = ?';

  db.all(query, [req.id], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
});

//add favorite company
router.post('/addToFavorite', authMiddleware, (req, res) => {
  //const studentId = req.params.studentId;
  const companyId = req.body.favoriteId;
  const query = 'INSERT INTO Favorite_company (student_id, company_id) VALUES (?, ?)';

  db.get(query, [req.id, companyId], (err, rows) => {
    if(err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).send("Favorite company added successfull");
  });
})


//remove favorite company
router.post('/removeFromFavorite', authMiddleware, (req, res) => {
  
  const companyId = req.body.favoriteId;
  const query = 'DELETE FROM Favorite_company WHERE student_id = ? AND company_id = ?';

  db.get(query, [req.id, companyId], (err, rows) => {
    if(err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    return res.status(200).send("Favorite company removed successfull");
  });
})


//get student by name
router.get('/getByName/:studentName', authMiddleware, (req, res) => {
  const studentName = req.params.studentName;
  const query = 'SELECT * FROM Student WHERE last_name = ?';

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
  SELECT Student_tags.*, Student.last_name
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


router.get('/:studentId/tags', (req, res) => {
  const studentId = req.params.studentId;

  // query to retrieve tag IDs associated with the given company ID to render the tags
  const query = `
    SELECT tag_id 
    FROM Student_tags 
    WHERE student_id = ?;
  `;

  db.all(query, [studentId], (err, rows) => {
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


//search by tag & id
router.post('/searchByNameAndTags', authMiddleware, (req, res) => {

  const tags = req.body.tags;
  const studentName = req.body.searchString;
  const query = `
  SELECT Student.*, Student_tags.tag_id
  FROM Student
  JOIN Student_tags ON Student.id = Student_tags.student_id
  WHERE Student_tags.tag_id IN (${tags})
  AND Student.last_name LIKE (?)
  GROUP BY Student.id`;
  const searchName = '%' + studentName + '%';

  db.all(query, [searchName], (err, students) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(students);
  });
});



//Search students
router.post('/search', (req, res) => {

  const searchString = req.body.searchString;
  const workPlace = req.body.workPlace;
  const tags = req.body.tags;

  let query = 'SELECT Student.* FROM Student, Student_tags';
  let joinWord = 'WHERE';

  if (searchString) {
    query = query + ` ${joinWord} (first_name LIKE '%${searchString}%' OR last_name LIKE '%${searchString}%') `;
    joinWord = 'AND';
  }

  if (workPlace) {
    query = query + ` ${joinWord} work_place IN ('${workPlace.join("', '")}')`;
    joinWord = 'AND';
  }

  if (tags) {
    query = query + ` ${joinWord} Student_tags.tag_id IN (${tags}) AND Student.id = Student_tags.student_id`;
  }

  query = query + ' GROUP BY Student.id';


  db.all(query, (err, students) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(students);
  })
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


export default router;