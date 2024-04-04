import express from 'express';
import dataRouter from './dataRoutes.js';
import companyRoutes from './company.js';
import studentRoutes from './student.js';
import cors from 'cors';
import bodyParser from 'body-parser';


const server = express();
const port = 3000;



//(*NOTE* I cant get the client/server connection to work with your CORS setting. Dont know why or to fix it. So i have seperate cors for the dataroutes)
//cross origin resource sharing settings to make the API work
/* const corsOptions = {
  origin: ['*'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}; */
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST'],
};
  


  // Apply CORS middleware
  server.use(cors(corsOptions));
  server.use(express.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json()); 
  
  // route handler for the /data endpoint
  server.use('/data', dataRouter);
  server.use('/company/', companyRoutes);
  server.use('/student/', studentRoutes);
  

  

  
  


  server.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });