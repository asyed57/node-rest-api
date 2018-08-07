const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const db             = require('./config/db');

const app            = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8000;
MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)

    // Make sure you add the database name and not the collection name
    var db = database.db("note-api");
    db.collection("notes");
    require('./app/routes')(app, db);
    app.listen(port, () => {
        console.log('We are live on ' + port);
    });
});
