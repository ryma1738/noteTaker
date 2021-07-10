const express = require('express');
const path = require('path');
const fs = require('fs');
const { notes } = require('./db/db.json');
const {createID, delNote} = require('./lib/notes');



const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
    let noteList = notes;
    console.log(noteList)
    res.json(noteList)
});

app.delete('/api/notes/:id', (req, res) => {
    delNote(req.params.id);
    res.json({message: `Deleted note successfully!`});
});

app.post('/api/notes', (req, res) => {
    let note = {
        id: createID(),
        title: req.body.title,
        text: req.body.text
    }
    let noteList = notes;
    noteList.push(note);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({'notes': noteList}, null, 2)
    );
    res.json(note);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
})