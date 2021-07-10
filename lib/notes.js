const { notes } = require('../db/db.json');
const fs = require('fs');
const path = require('path');

function createID() {
    var noteList = notes;
    var id = null;
    console.log(noteList)
    while (true) {
        id = Math.floor(Math.random() * 100000 ) + 1;
        let repeat = false;
        if (noteList) {
            for (var i = 0; i < noteList.length; i++) {
                if (id === noteList[i].id) {
                    repeat = true
                }
            }
            if (!repeat) { 
                break;   
            }
        } else {
            break;
        }
    }

    return id; 
}

function delNote(id) {
    console.log(id)
    let noteList = notes;
    let index = noteList.findIndex(note => note.id == id);
    console.log(index);
    noteList.splice(index, 1)
    fs.writeFileSync(path.join(__dirname, '../db/db.json'),
        JSON.stringify({'notes': noteList}, null, 2)
    );
}



module.exports = {
    createID,
    delNote
}