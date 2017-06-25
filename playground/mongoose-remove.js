const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/Todo');
const { User } = require('./../server/models/User');

const { ObjectID } = require('mongodb');

// Todo.remove({})
// .then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove

// Todo.findByIdAndRemove('5950363f547369476f9a82b4')
// .then((todo) => {
//     console.log(todo);
// });