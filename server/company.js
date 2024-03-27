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

  export default router;