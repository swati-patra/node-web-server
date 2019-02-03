const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    text: 'first test todo'
},{
    text: 'second test todo'
}];
// beforeEach((done) => {                         
//     Todo.remove({}).then(() => done());              //wipe all the data from todos
// });

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    } ).then(() => done());
});

describe('POST /todos', () => {                              //describe - multiple test cases
    it('should create a new todo', (done) => {
        var text = 'test todo text';

        request(app)                                       //we have to make request on app
        .post('/todos')
        .send({text})                   //object is passed in send and it get converted to json by supertest                 
        .expect(200)                    //status
        .expect((res) => {
            expect(res.body.text).toBe(text);           //body from res should be equal to text
        })
        .end((err,res) => {                                
            if(err) {
                return done(err);
            }

            Todo.find({text}).then((todos) => {                //fetch all data from collection
                expect(todos.length).toBe(1);            //length to be equal to   1
                expect(todos[0].text).toBe(text);        //if test from todo is equal to text
                done();
            }).catch((e) => done(e));                     //catches the error
        });
    });

    it('should not create todo with invalid body data',(done) => {
        

            request(app)
            .post('/todos')
            .send({})                       
            .expect(400)                              
            .end((err,res) => {
                if(err) {
                    return done(err);
                }

                Todo.find().then((todos) => {

                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });

    });
});

describe('GET /todos',() => {
    it('should get all todos',(done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })

        .end(done);
    })
})