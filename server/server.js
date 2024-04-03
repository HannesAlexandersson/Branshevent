import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const server = express();
const port = 3000;

//cross origin resource sharing settings to make the API work
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST'],
  };
  
  // Apply CORS middleware
  server.use(cors(corsOptions));
  server.use(express.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  

  //testdata for debugging
  const data = {
    message: 'This is a test message from the server',
  };
  //test endpoint for get requests
  server.get('/test', (req, res) => {
    res.json(data);
  });
  
  //test endpoint for post request from client
  server.post('/data', (req, res) => {
    const userData = req.body;    
    console.log('Received data from client:', userData);    
    res.status(200).send('Data received successfully');
});







  server.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });