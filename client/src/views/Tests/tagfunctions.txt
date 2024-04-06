import { db } from './db.js';

function getAllTags(callback) {
    const query = 'SELECT * FROM Tag';
    db.all(query, (err, rows) => {
        if (err) {
            console.error('Error retrieving tags:', err);
            callback(err, null);
            return;
        }
        console.log('Tags received...');//debugging, if the fetch from db works
        callback(null, rows);
    });
}

export { getAllTags };