const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const { PORT } = require('./config');
var { Todo } = require('./models/Todo');
var { User } = require('./models/User');

var app = express();
app.use(bodyParser.json());

// POST /todos
app.post('/todos', (req, res) => {

    var todo = new Todo({
        text: req.body.text
    });

    todo.save()
    .then((doc) => {
        res.json(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET /todos
app.get('/todos', (req, res) => {
    Todo.find()
    .then((todos) => res.json({ todos }))
    .catch((e) => res.status(400).send({
        message: 'Could not get all todos.'
    }));
});

// GET /todos/:id
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    Todo.findById(id)
    .then((todo) => {
        if(!todo) {
            return res.status(404).json({
                message: 'Could not find your todo.'
            });
        }
        res.json({todo});
    })
    .catch((e) => res.status(400).json({
        message: 'There was an error finding your todo.'
    }));
});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    Todo.findByIdAndRemove(id)
    .then((todo) => {
        if(!todo) {
            return res.status(404).json({
                message: 'Could not find your todo.'
            });
        }
        res.json({todo});
    }).catch((e) => res.status(400).json({
        message: 'Could not delete your todo.'
    }));
});

app.listen(PORT, () => {
    console.log(`The magic happens on port ${PORT}!`);
});

module.exports = { app };