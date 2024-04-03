import express from 'express';
import cors from 'cors';

const app = express();
const port = 5173;

// Enable CORS for all routes
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Define your company routes here (assuming you have them)

// Endpoint to handle POST requests from the client
app.post('/test', (req, res) => {
    const userData = req.body;   
    
    console.log('Received data from client:', userData);
    
    // Send a response back to the client
    res.status(200).send('Data received successfully');
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});