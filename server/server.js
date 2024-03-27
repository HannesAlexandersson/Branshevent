import express from 'express';
import sqlite3 from 'sqlite3';
import companyRoutes from './company.js'

const server = express();
const port = 3000;

server.use('/company/', companyRoutes);

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});