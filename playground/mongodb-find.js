// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } = require('mongodb');

var objId = new ObjectID();

console.log(objId);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //  _id: new ObjectID('594803d592349b33403defd8')
    // }).toArray()
    // .then((docs) => {
    //  console.log('Todos');
    //  console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //  console.log('Error fetching todos', err);
    // });

    // db.collection('Todos').find().count()
    // .then((count) => {
    //  console.log('Todos count', count);
    // }, (err) => {
    //  console.log('Error counting todos', err);
    // });


    db.collection('Users').find({
        name: 'Samarth Dave'
    }).toArray()
    .then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Error counting todos', err);
    });

    // db.close();
});