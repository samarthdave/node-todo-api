const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/Todo');
const { User } = require('./../server/models/User');

const { ObjectID } = require('mongodb');

var id = '594fef1ea52ed00fac658b6f';

if(!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

// Todo.findById(id)
// .then((todo) => {
//     if(!todo) {
//         return console.log('ID not found');
//     }
//     console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

User.findById(id)
.then((user) => {
    if(!user) {
        return console.log('Unable to find user');
    }
    console.log(user);
}).catch((e) => console.log(e));


// Todo.find({
//     _id: id
// }).then((todos) => console.log('Todos', todos));

// Todo.findOne({
//     _id: id
// }).then((todo) => console.log('Todo findOne', todo));