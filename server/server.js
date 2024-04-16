import express from 'express';
import companyRoutes from './company.js';
import studentRoutes from './student.js';
import tagRoutes from './tags.js';
import userRoutes from './user.js';
import avatarRoutes from './avatar.js';
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
//need to set the limit before the first parser is encounterd or else it sets the limit to 1mb
server.use(express.json({limit: '50mb'}));
server.use(express.urlencoded({limit: '50mb'}))
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())


server.use('/api/company/', companyRoutes);
server.use('/api/student/', studentRoutes);
server.use('/api/user/', userRoutes);
server.use('/api/tags', tagRoutes);
server.use('/api/avatars/', avatarRoutes);



server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});