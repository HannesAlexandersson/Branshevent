import express from 'express';
import sqlite3 from 'sqlite3';

const router = express.Router();
const db = new sqlite3.Database('branchEvent.db');


//get all students
router.get('/all', (req, res) => {
    const query = 'SELECT * FROM Student';
  
    db.all(query, [], (err, rows) => {
      if (err) {
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
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(rows);
  });
});


//login
router.post('/login', (req, res) => {
  //const password = req.body.password;
  const email = req.body.email;
  const query = 'SELECT * FROM Student WHERE email = ?';

  console.log(email, req.body);
  db.get(query, [email], (err, result) => {
    if(err){
      console.log(err.message);
      return res.status(500).json({error : 'Internal Error Error'});
    }
    if (!result) {
      console.log('Login fail : No student found');
      return res.status(403).json({ error: 'Email or password incorrect' });
    } else {
      console.log('Successfully logged in')
      return res.status(200).send(result);
    }
  });
})

export default router;