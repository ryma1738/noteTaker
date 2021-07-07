const { db } = require('../db/db.json');
const fs = require('fs');

function createID() {

    let notes = db;
    var id = null;
    while (true) {
        id = Math.floor(random() * 100000 ) + 1;
        let repeat = false;

        for (var i = 0; i < notes.length; i++) {
            if (id === notes[i].id) {
                repeat = true
            }
        }

        if (!repeat) { break }
    }

    return id; 
}

module.exports = {
    createID
}