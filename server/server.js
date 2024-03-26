import express from 'express';
import sqlite3 from 'sqlite3';

const server = express();
const port = 3000;

const db = new sqlite3.Database()

server.get('/', (req, res) => {
    res.send('Hello Fellaz!');
});

server.listen(port, () => {
    console.log('Server is running');
});

