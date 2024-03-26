import express from 'express';

const server = express();
const port = 3000;

server.get('/', (req, res) => {
    res.send('Hello Fellaz!');
});

server.listen(port, () => {
    console.log('Server is running');
});