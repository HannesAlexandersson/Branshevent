import express from 'express';
import companyRoutes from './company.js';
import studentRoutes from './student.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PORT } from './config.js';

const server = express();
const port = PORT;

//cross origin resource sharing settings to make the API work
const corsOptions = {
  origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };
  
server.use(cors(corsOptions));
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json())
server.options('/api/test', cors());
server.use('/api/company/', companyRoutes);
server.use('/api/student/', studentRoutes);
server.get('/api/test', (req, res) => {
  res.json({ message: 'This is a test endpoint' });
});

server.listen(port, () => {
    console.log(`Server is running on ${port}`);
});