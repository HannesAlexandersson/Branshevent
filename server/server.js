import express from 'express';
import companyRoutes from './company.js';
import studentRoutes from './student.js';
import tagRoutes from './tags.js';
import userRoutes from './user.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PORT } from './config.js';



const server = express();
const port = PORT;



//cross origin resource sharing settings to make the API work
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
server.use(cors(corsOptions));
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())

server.use('/api/company/', companyRoutes);
server.use('/api/student/', studentRoutes);
server.use('/api/user/', userRoutes);
server.use('/api/tags', tagRoutes);



server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});