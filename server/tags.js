import express from 'express';
import sqlite3 from 'sqlite3';
import jwt from 'jsonwebtoken';
import { SECRET, SALT } from './config.js';
import { authMiddleware } from './authMiddleware.js';
import bcrypt from 'bcrypt';


const router = express.Router();
const db = new sqlite3.Database('branchEvent.db');

router.get('/all', authMiddleware, (req, res) => {
    const query = 'SELECT Tags.*, Categories.name as category_name FROM Tags, Categories WHERE Tags.category_id = Categories.id';
    
    db.all(query, [], (err, tags) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          res.json(tags);
    });
});

router.get('/getUsedTags', authMiddleware, (req, res) => {
    const query = 'SELECT Tags.*, Categories.name as category_name FROM Tags, Categories WHERE Tags.category_id = Categories.id AND Tags.id IN (SELECT Company_tags.tag_id FROM Company_tags)';
    db.all(query, [], (err, tags) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: 'Internal Server Error' });
          }
          res.json(tags);
    });
});

export default router;