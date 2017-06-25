const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { PORT } = require('./config');
var { Todo } = require('./models/Todo');
var { User } = require('./models/User');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {

    var todo = new Todo({
        text: req.body.text
    });

    todo.save()
    .then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(PORT, () => {
    console.log(`The magic happens on port ${PORT}!`);
});

module.exports = { app };