import express from 'express';
import sqlite3 from 'sqlite3';

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


//get student by ID
router.get('/:studentId', (req, res) => {
  const companyId = req.params.studentId;
  const query = 'SELECT * FROM Student WHERE id = ?';

  db.get(query, [studentId], (err, rows) => {
    if(err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
});


//login
router.post('/login', (req, res) => {
  const password = req.body.password;
  const email = req.body.email;
  const query = 'SELECT * FROM Student WHERE email = ? AND password = ?';

  db.get(query, [email], (err, result) => {
    if(err){
      console.log(err.message);
      return res.status(500).json({ error : 'Internal Server Error' });
    }
    if(!result) {
      console.log('Login fail : No student found');
      return res.status(403).json({ error: 'Email or password incorrect' });
    } else {
      console.log('Successfully logged in')
      return res.status(200).send(result);
    }
  });
})


//registration
router.post('/registration', (req, res) => {
    const { first_name, last_name, email, password, phone_number, tags, description, work_place } = req.body;
    const query = 'INSERT INTO Student (first_name, last_name, email, password, phone_number, description, work_place) VALUES (?, ?, ?, ?, ?, ?)'; 

    
    //1. create the student
    db.run(query, [first_name, last_name, email, password, phone_number, description, work_place], function(err) {
        if(err){
            console.log(err.message);
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
            
                return res.status(200).json({ id: studentId });
            });
        } else {
            return res.status(200).json({ id: studentId });
        }

        

    });
})




export default router;