import sqlite3 from 'sqlite3';

// connect to our db
const db = new sqlite3.Database('branchEvent.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to branch-event database!');
});


export { db };