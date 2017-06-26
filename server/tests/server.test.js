const expect = require('chai').expect;
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/Todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    // delete everything
    Todo.remove({})
    .then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({ text })
        .expect(200)
        .expect((res) => {
            expect(res.body.text).to.equal(text);
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }

            Todo.find({ text })
            .then((todos) => {
                expect(todos.length).to.equal(1);
                expect(todos[0].text).to.equal(text);
                done();
            }).catch((e) => done(e));
        });
    });

    it('should not create todo w/invalid body data', (done) => {
        request(app)
        .post('/todos')
        .expect(400)
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            Todo.find({})
            .then((todos) => {
                expect(todos.length).to.equal(2);
                done();
            }).catch((e) => done(e));
        });
    });
});


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).to.equal(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        var todoId = todos[0]._id.toHexString();

        request(app)
        .get(`/todos/${todoId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).to.equal(todos[0].text);
        })
        .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        // make sure 404 is returned
        var todoId = new ObjectID().toHexString();

        request(app)
        .get(`/todos/${todoId}`)
        .expect(404)
        .end(done);
    });

    it('should return 400 for non object ids', (done) => {
        // /todos/123
        request(app)
        .get('/todos/1234')
        .expect(400)
        .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).to.equal(hexId);
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }

            Todo.findById(hexId)
            .then((user) => {
                expect(user).to.be.a('null');
                done();
            }, (e) => done(e));
        });
    });

    it('should return 404 if todo is not found', (done) => {
        var hexId = new ObjectID().toHexString();

        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });

    it('should return 400 if object id is invalid', (done) => {
        request(app)
        .delete('/todos/1234')
        .expect(400)
        .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = 'Edited todo!';

        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            text,
            completed: true
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).to.equal(text);
            expect(res.body.todo.completed).to.equal(true);
            expect(res.body.todo.completedAt).to.be.a('number');
        })
        .end(done);
    });

    it('should clear completedAt when completed is false', (done) => {
        var hexId = todos[1]._id.toHexString();
        var text = 'This should be new text!!';

        request(app)
        .patch(`/todos/${hexId}`)
        .send({
            completed: false,
            text
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.completedAt).to.be.a('null');
        })
        .end(done);
    });
});