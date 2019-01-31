var express = require('express');
var bodyParser = require('body-parser');

 
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {user} = require('./models/user');


var app = express();                   // app stores the application of express

app.use(bodyParser.json());              //middlewere

app.post('/todos', (req,res) => {           //post route to create resource
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);                            //information at postman
    },(err) =>{
        res.status(400).send(err);
    })
});

app.get('/todos',(req,res) => {
    Todo.find().then((todos) =>{
        res.send({todos});
    },(e) => {
        res.status(400).send(e);
    })
});

app.listen(3000, () => {                //listening to a port

    console.log('started on port 3000');
});           


module.exports = {app};





// mongoose.promise = global.promise;
// //mongoose.connect('mongodb://localhost:27017/TodoApp');


// // var Todo = mongoose.model('Todo',{
// //     text: {
// //         type: String,
// //         required: true,
// //         minlength: 2,
// //         trim: true
// //     },
// //     completed:{
// //         type: Boolean,
// //         defalut: false
// //     },
// //     completedAt: {
// //         type: Number,
// //         default: null
// //     }
// // });


// // var newTodo = new Todo({
// //     text: 'cook dinner'
// // });

// // var newTodo = new Todo({
// //     text: ' abc '
// // }); 



// // newTodo.save().then((doc)=> {
// //     console.log('saved todo ',doc);
// // },(err) => {
// //     console.log('unable to save');
// // });

// mongoose.connect('mongodb://localhost:27017/Users');

// var user = mongoose.model('user',{
//     email : {
//     type:  String,
//     minlength: 1,
//     trim: true
//     }
// }) ;

// var newUser = new user({
//     email: 'kumari.patra01@gmail.com'
// });

// newUser.save().then((docs)=> {
//     console.log('saved user: ',docs);
// }, (err) => {
//     console.log('unable to save ');
// }
// );