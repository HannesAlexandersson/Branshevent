import express from 'express';
import sqlite3 from 'sqlite3';
import jwt from 'jsonwebtoken';
import { SECRET, SALT } from './config.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const db = new sqlite3.Database('branchEvent.db');



//  A single Login endpoint for both student and company, returns token and userdata
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const companyQuery = 'SELECT * FROM Company WHERE email = ?';
    const studentQuery = 'SELECT * FROM Student WHERE email = ?';
  
    // Check company table
    db.get(companyQuery, [email], (companyErr, companyResult) => {
        if (companyErr) {
            console.error('Error querying company table:', companyErr);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        if (companyResult) {
            // User found in company table
            bcrypt.compare(password, companyResult.password, (bcryptErr, bcryptResult) => {
                if (bcryptErr) {
                    console.error('Error comparing passwords:', bcryptErr);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
  
                if (bcryptResult) {
                    // Passwords match - company authenticated
                    console.log('Company authenticated successfully');
                    const token = jwt.sign({ id: companyResult.id, userType: 'company' }, SECRET, { expiresIn: 864000 });
                    return res.status(200).json({ token, userType: 'company', userData: companyResult });
                } else {
                    // Incorrect password
                    console.log('Incorrect password for company');
                    return res.status(401).json({ error: 'Incorrect email or password' });
                }
            });
        } else {
            // User not found in company table, check student table
            db.get(studentQuery, [email], (studentErr, studentResult) => {
                if (studentErr) {
                    console.error('Error querying student table:', studentErr);
                    return res.status(500).json({ error: 'Internal Server Error' });
                }
  
                if (studentResult) {
                    // User found in student table
                    bcrypt.compare(password, studentResult.password, (bcryptErr, bcryptResult) => {
                        if (bcryptErr) {
                            console.error('Error comparing passwords:', bcryptErr);
                            return res.status(500).json({ error: 'Internal Server Error' });
                        }
  
                        if (bcryptResult) {
                            // Passwords match - student authenticated
                            console.log('Student authenticated successfully');
                            const token = jwt.sign({ id: studentResult.id, userType: 'student' }, SECRET, { expiresIn: 864000 });
                            return res.status(200).json({ token, userType: 'student', userData: studentResult });
                        } else {
                            // Incorrect password
                            console.log('Incorrect password for student');
                            return res.status(401).json({ error: 'Incorrect email or password' });
                        }
                    });
                } else {
                    // User not found in student table either
                    console.log('User not found');
                    return res.status(401).json({ error: 'Incorrect email or password' });
                }
            });
        }
    });
});

  export default router;