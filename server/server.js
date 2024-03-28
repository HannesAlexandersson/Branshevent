import express from 'express';
import companyRoutes from './company.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const server = express();
const port = 3000;

//cross origin resource sharing settings to make the API work
const corsOptions = {
    origin: ['*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
server.use(cors(corsOptions));
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())

server.use('/company/', companyRoutes);

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});