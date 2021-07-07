const { notes } = require('../db/db.json');
const fs = require('fs');

function createID() {
    var noteList = notes;
    var id = null;
    console.log(noteList)
    while (true) {
        id = Math.floor(Math.random() * 100000 ) + 1;
        let repeat = false;

        for (var i = 0; i < noteList.length; i++) {
            if (id === noteList[i].id) {
                repeat = true
            }
        }

        if (!repeat) { break }
    }

    return id; 
}

function delNote(id) {
    let noteList = notes;
    let updated = noteList.filter(note => note.id !== id);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({notes: updated}, null, 2)
    );
}

module.exports = {
    createID,
    delNote
}