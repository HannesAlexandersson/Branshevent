import express from 'express';
import sqlite3 from 'sqlite3';

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


//get company by ID
router.get('/:companyId', (req, res) => {
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


//login
router.post('/login', (req, res) => {
  //const password = req.body.password;
  const email = req.body.email;
  const query = 'SELECT * FROM Company WHERE email = ?';

  console.log(email, req.body);
  db.get(query, [email], (err, result) => {
    if(err){
      console.log(err.message);
      return res.status(500).json({error : 'internal server error'});
    }
    if (!result) {
      console.log('Login fail : No company found');
      return res.status(403).json({ error: 'Email or password incorrect' });
    } else {
      console.log('Successfully logged in')
      return res.status(200).send(result);
    }
  });
})

//registration
router.post('/registration', (req, res) => {
  const { company_name, first_name, last_name, phone, email, password } = req.body;
  const query = 'INSERT INTO Company (company_name, first_name, last_name, phone, email, password) VALUES (?, ?, ?, ?)';

  console.log(password);
  db.run(query, [company_name, first_name, last_name, phone, email, password], function(err) {
      if(err){
          console.log(err.message);
          return res.status(500).json({ error : 'Internal Server Error' });
      }
      console.log('Registration successfull')
      return res.status(200).json({ id: this.lastID });
  });
})

export default router;