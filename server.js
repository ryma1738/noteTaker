const express = require('express');
const db = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const { db } = require('./db/db.json')



const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/note', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

app.post('/api/notes', (req, res) => {
    let note = {
        id: createID(),
        title: req.title,
        body: req.text
    }
    let notes = db;
    notes.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({notes: notes}, null, 2)
    );
    return note;
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`)
})